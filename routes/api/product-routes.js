const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/products` endpoint

// get all products
//router.get('/', (req, res) => {
//   // find all products
//   // be sure to include its associated Category and Tag data


router.get('/', async (req, res) => {
      try {
        const product = await Product.findAll({
          include: [
          {
            model: Category,
            attributes: ['category_name'],
          },
          {
            model: Tag,
            attributes: ['tag_name'],
          }]
        });
        res.json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve product' });
      }
    });





    router.get('/:id',async (req, res) => {

      const productId = req.params.id;
    
      try {
        const product = await Product.findByPk(productId, {
          include: [
            {
              model: Category,
              attributes: ['category_name'],
            },
            {
              model: Tag,
              attributes: ['tag_name'],
            }]
          });
        
        if (!product) {
          return res.status(404).json({ error: 'product not found' });
        }
        res.json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve product' });
      }
    });
    



router.post('/', async (req, res) => {
      try {
        const newProduct = await Product.create(req.body); 
        res.status(201).json(newProduct);
    
      } catch (err) {
        console.error(err);
    
        res.status(500).json({ error: 'Failed to create product' });
      }});



router.put('/:id', async (req, res) => {
      const productId = req.params.id;
      try {
        const updatedProduct = await Product.update(
          {
            product_name: req.body.product_name
          },
          {
            where: { id: productId }
          }
        );
        res.json(updatedProduct);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update product' });
      }
      });



router.delete('/:id', async (req, res) => {
      const productId = req.params.id;
    
      try {
        const numRowsDeleted = await Product.destroy({
          where: { id: productId }
        });
        if (numRowsDeleted === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).end();
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete product' });
      }
    });







// //// assuming Sequelize models are defined in ./models directory
// db.Product.findAll({
//   include: [
//     {
//       model: db.Category,
//     },
//     {
//       model: db.Tag,
//       through: { attributes: [] } // exclude join table attributes from results
//     }
//   ]
// })
// });
// .then(products => {
//   console.log(products);
// })
// .catch(error => {
//   console.error(error);
// });
// products.forEach(product => {
//   console.log(product.name); // product name
//   console.log(product.Category.name); // associated category name
//   console.log(product.Tags.map(tag => tag.name)); // array of associated tag names



// get one product
// router.get('/:id', (req, res) => {
//   // find a single product by its `id`
//   // be sure to include its associated Category and Tag data
//   Product.findOne({
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       {
//         model: db.Category,
//       },
//       {
//         model: db.Tag,
//         through: { attributes: [] } // exclude join table attributes from results
//       }
//     ]
//   })
//   .then(product => {
//       if (!product) {
//         res.status(404).json({ message: 'No product found with this id!' });
//         return;
//       }
//       res.status(200).json(product);
//     })
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });

// });



// // create new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// // update product
// router.put('/:id', (req, res) => {
//   app.put('/products/:id', (req, res) => {
//     const productId = req.params.id;  // Extract the product ID from the URL params
//     const { name, price } = req.body;  // Extract the updated product data from the request body
  
//     // Find the product in the products array with the matching ID
//     const productIndex = products.findIndex(product => product.id === productId);
  
//     if (productIndex !== -1) {  // If the product was found
//       // Update the product data with the new values
//       products[productIndex].name = name;
//       products[productIndex].price = price;
  
//       // Send a response indicating success and the updated product data
//       res.status(200).json({
//         message: 'Product updated successfully',
//         product: products[productIndex]
//       });
//     } else {  // If the product wasn't found
//       // Send a response indicating failure and an error message
//       res.status(404).json({
//         message: 'Product not found'
//       });
//     }
//   });


//   // update product data
//   // Product.update(req.body, {
//   //   where: {
//   //     id: req.params.id,

//       router.put('/:id', async (req, res) => {
//         try {
//           const productId = req.params.id;
//           const updatedProduct = req.body;
//           const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
//           res.json(result);
//         } catch (err) {
//           res.status(500).json({ message: err.message });
//         }
//       });
      
//     },
//   )
  


//.then((product) => {
      // find all associated tags from ProductTag
      //return ProductTag.findAll({ where: { product_id: req.params.id } });
//})
  //  .then((productTags) => {
      // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//    // })
//    // .then((updatedProductTags) => res.json(updatedProductTags))
//    // .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//    // });
//  // });

// router.delete('/:id', (req, res) => {
//   // delete one product by its `id` value
// });

module.exports = router;
