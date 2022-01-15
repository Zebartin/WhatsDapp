App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    console.log('app init');
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://172.23.16.1:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Review.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ReviewnArtifact = data;
      App.contracts.Review = TruffleContract(ReviewnArtifact);

      // Set the provider for our contract
      App.contracts.Review.setProvider(App.web3Provider);
    });
  },


  initAllItems: async function () {
    let instance = await App.contracts.Review.deployed();
    let itemCnt = await instance.itemCnt.call();
    let data = [];
    for (i = 0; i < itemCnt; i++) {
      data.push(await App.readItem(i));
    }
    return data;
  },
  createItem: function (category, belong, name, detail, callback) {
    console.log('新增导师：' + name);
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var a = accounts[0];
      App.contracts.Review.deployed().then(instance => {
        return instance.createItem(name, category, belong, detail, { from: a });
      })
        .then(callback)
        .catch(err => console.log(err.message));
    });
  },

  makeComment: function (itemID, grade, review, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var a = accounts[0];
      App.contracts.Review.deployed().then(instance => {
        return instance.makeComment(itemID, grade, review, { from: a });
      })
        .then(callback)
        .catch(err => console.log(err.message));
    });
  },

  readItem: async function (itemID) {
    let instance = await App.contracts.Review.deployed();
    let item = await instance.readItem.call(itemID);
    let ret = {
      name: item[0],
      category: item[1],
      belong: item[2],
      detail: item[3],
      scores: [],
      reviews: []
    };
    for (let i=0;i<item[4]; i++){
      let t = await instance.readComment.call(itemID, i);
      ret.scores.push(t[1].toNumber());
      ret.reviews.push(t[0]);
    }
    return ret;
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
