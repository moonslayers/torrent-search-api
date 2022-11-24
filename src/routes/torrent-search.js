const { Router } = require('express');
const router = Router();
const {getProviders, searchTorrents, searchTorrentsAll, quickSearch,getSearchs,createSearch} = require('../controllers/torrent-search.controller');
router.route('/providers')
    .get(getProviders)
router.route('/:provider/:category/:name/:limit')
    .get(searchTorrents)
router.route('/:category/:name/:limit')
    .get(searchTorrentsAll)
router.route('/:name/:limit')
    .get(quickSearch)
router.route('/searchs')
    .get(getSearchs)
    .post(createSearch)
module.exports = router;
