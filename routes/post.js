const express = require('express')

const createController = require('../controllers/post/create')
const updateController = require('../controllers/post/update')
const getMyPostController = require('../controllers/post/getMyPost')
const getPostController = require('../controllers/post/getPost')
const removePostController = require('../controllers/post/remove')
const dashbordController = require('../controllers/post/dashbord')


const requestHandler = require('../middlewares/requestHandler');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for Create Post
 * @route POST /post/createPost
 * @group SDK Api [Auth]
 * @param {post.model} Data.body.required - post data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
* @typedef post
* @property {string} title - title - ex. first post
* @property {string} content - content  - ex. about post,
* @property {string} lat - latitude,
* @property {string} long - logitude
*/
router.post('/create', requestHandler(createController));

/**
 * API for Update Post
 * @route POST /post/updatePost
 * @group SDK Api [Auth]
 * @param {post.model} Data.body.required - post data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
* @typedef post
* @property {string} postId - postId - ex. post_id
* @property {string} title - title - ex. first post
* @property {string} content - content  - ex. about post,
* @property {string} lat - latitude,
* @property {string} long - logitude
*/
router.post('/updatePost', requestHandler(updateController));

/**
 * API for Post
 * @route GET /post/getAllPost
 * @group SDK Api [Auth]
 * @param {post.model} Data.body.required - post data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security  [{"JWT": []}]
 */


router.get('/getAllPost', requestHandler(getPostController))

/**
 * API for Post
 * @route GET /post/myPost
 * @group SDK Api [Auth]
 * @param {post.model} Data.body.required - post data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security  [{"JWT": []}]
 */


router.get('/myPost', requestHandler(getMyPostController));


/**
 * API for Post
 * @route GET /post/removePost
 * @group SDK Api [Auth]
 * @param {post.model} Data.body.required - post data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security  [{"JWT": []}]
 */

/**
* @typedef post
* @property {postId} postId - postId  - eg: 216512asdasdqweqw31q1
*/

router.get('/removePost', requestHandler(removePostController));


/**
 * API for postDashbord
 * @route get /post/dashbord
 * @group SDK Api [Auth]
 * @param {postDashbord.model} Data.body.required - postDashbord data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.get('/dashbord', requestHandler(dashbordController));

module.exports = router;