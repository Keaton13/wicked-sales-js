require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});
app.get('/api/products', (req, res, next) => {
  // get all products
  db.query('SELECT "productId", "name", "price", "image", "shortDescription" FROM "products"')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:id', (req, res, next) => {
  const id = req.params.id;
  // grab single product with productId
  db.query(`SELECT * FROM "products" WHERE "productId" = ${id} `)
    .then(result => {
      if (result.rows[0] === undefined) {
        next(new ClientError(`cannot find product with id ${id}`, 404));
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  // If cart Id dosn't exist return empty array
  if (!req.session.cartId) {
    res.json([]);
  } else {
    // If cartId, join tables and add product to cartItems
    db.query(` 
    SELECT "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
    FROM "cartItems" AS "c"
    JOIN "products" AS "p" USING ("productId")
    WHERE "c"."cartId" = $1`, [req.session.cartId])
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => {
        next(err);
      });
  }
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body.productId;
  // Take product Id from body and check if it is a number and positive
  if (isNaN(productId) || productId < 0) {
    return next(new ClientError('The productId is invalid. Need positive integer', 400));
  }
  db.query(`
    SELECT "price"
    FROM "products"
    WHERE "productId" = $1;
  `, [productId])
    .then(result => {
      // If no product is found return error 400
      if (result.rows.length === 0) {
        throw new ClientError(`Can not find price for productId '${productId}'`, 400);
      } else {
        const price = result.rows[0].price;
        // If no cartId exists create new cartId and insert. If cartId exitst pass to next()
        if (!req.session.cartId) {
          return db.query(`
            INSERT INTO "carts" ("cartId", "createdAt")
            VALUES (default, default)
            RETURNING "cartId";
          `).then(result => {
            // Return cartId and price to the next .then()
            return {
              cartId: result.rows[0].cartId,
              price
            };
          }).catch(err => {
            next(err);
          });
        } else {
          return { // Sending current CartId
            cartId: req.session.cartId,
            price
          };
        }
      }
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const cartId = data.cartId;
      return db.query(`
        INSERT INTO "cartItems" ("cartId", "productId", "price")
        VALUES ($1, $2, $3)
        RETURNING "cartItemId";
      `, [cartId, productId, data.price])
        .then(result => {
          // pass cartItemId to next then()
          return result.rows[0].cartItemId;
        })
        .catch(err => {
          next(err);
        });

    })
    // Get columns from cartItemId that was just added to cart
    .then(cartItemId => {
      db.query(`
        SELECT "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
        FROM "cartItems" AS "c"
        JOIN "products" AS "p" USING ("productId")
        WHERE "c"."cartItemId" = $1;
      `, [cartItemId])
        .then(result => {
          res.status(201).json(result.rows[0]);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/cart/remove', (req, res, next) => {
  const productId = req.body.productId;
  // remove cartItem with matching cartId and productId
  db.query(`
    DELETE FROM "cartItems" WHERE "cartId" = ${req.session.cartId} AND "productId" = ${productId}
    RETURNING "cartItemId"`)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      next(err);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
