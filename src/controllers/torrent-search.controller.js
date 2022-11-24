const torrentCtrl = {};
const Search = require('../models/Search');
//torrent search engine
const TorrentSearchApi = require('torrent-search-api');
//enable providers
TorrentSearchApi.enableProvider('1337x');
TorrentSearchApi.enableProvider('ThePirateBay');
TorrentSearchApi.enableProvider('TorrentProject');
TorrentSearchApi.enableProvider('Yts');
TorrentSearchApi.enableProvider('Limetorrents');
TorrentSearchApi.enableProvider('Eztv');


torrentCtrl.getSearchs = async (req, res) => {
    Search.count().exec(function (err, count) {

      // Get a random entry
      var random = Math.floor(Math.random() * count)

      // Again query all users but only fetch one offset by our random #
      Search.find().limit(10).skip(random).exec(
        function (err, result) {
          res.json(result);
        })
    })
}
torrentCtrl.createSearch = async (req, res) => {
    const { searchname } = req.body;
    const newSearch = new Search({searchname});
    console.log(newSearch);
    await newSearch.save().catch(error => console.log("key error handled"));
    res.json({message: 'Search recorded'});
}

torrentCtrl.getProviders = async (req, res) => {
    const activeProviders = TorrentSearchApi.getActiveProviders();
    res.json(activeProviders);
}
torrentCtrl.searchTorrents = async (req, res) => {
    try{
      const torrents = await TorrentSearchApi.search([req.params.provider],req.params.name, req.params.category, req.params.limit);
      res.json(torrents)
      console.log("consulta: " + req.params.provider +" "+ req.params.name +" "+ req.params.category+" "+ req.params.limit);
    }catch (e){
      console.log(e);
      res.json([{title:"PROVIDER NOT AVAIBLE"}])
    }
    
}
torrentCtrl.searchTorrentsAll = async (req, res) => {
    const providers=['1337x','ThePirateBay','TorrentProject','Yts','Limetorrents','Eztv'];
    console.log(providers[0])
    var results=[];
    for(let i = 0; i < providers.length; i++) {
      let obj = providers[i];
      const torrents = await TorrentSearchApi.search([obj],req.params.name, req.params.category, req.params.limit);
      results.push(torrents)
      console.log(providers[i])
    }
    res.json(JSON.parse(JSON.stringify(results)))
    console.log("consulta All: "+ req.params.name +" "+ req.params.category+" "+ req.params.limit)
}
torrentCtrl.quickSearch = async (req, res) => {
    const torrents = await TorrentSearchApi.search(req.params.name,'All',req.params.limit);
    res.json(torrents)
    console.log("consulta Quick: " + req.params.name +" "+ req.params.limit)
}
//usersCtrl.getUsers = (req, res) => res.send('Users []')
//usersCtrl.createUser = (req, res) => res.send('User created')
//usersCtrl.deleteUser = (req, res) => res.send('User deleted')
module.exports = torrentCtrl;


