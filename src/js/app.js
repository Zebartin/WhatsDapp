App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

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

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });


    return App.bindEvents();
  },

  bindEvents: function () {
    // $(document).on('click', '.mentor', App.handleAdopt);
  },

  initAllItems: async function () {
    let instance = await App.contracts.Review.deployed();
    let itemCnt = await instance.itemCnt.call();
    let data = [];
    for (i = 0; i < itemCnt; i++)
      data.push(await App.readItem(i));
          var itemTable = $('#allItems');
      var itemTemplate = $('#itemTemplate');
      console.log(data);
      for (i = 0; i < data.length; i++) {
        var itemdiv = $('<div></div>');
        itemdiv.addClass('item');
        var coldiv = $('<div></div>');
        coldiv.addClass('item-category');
        coldiv.text('TODO');
        coldiv.appendTo(itemdiv);

        coldiv = $('<div></div>');
        coldiv.addClass('item-belong');
        coldiv.text('TODO');
        coldiv.appendTo(itemdiv);

        coldiv = $('<div></div>');
        coldiv.addClass('item-name');
        coldiv.text(data[i][0])
        coldiv.appendTo(itemdiv);

        coldiv = $('<div></div>');
        coldiv.addClass('item-involve-num');
        coldiv.text(data[i][3].length)
        coldiv.appendTo(itemdiv);

        let sumScore = data[i][3].reduce((sum, x) => sum+Number(x),0);
        coldiv = $('<div></div>');
        coldiv.addClass('item-score');
        if (data[i][3].length === 0)
          coldiv.text('暂无评分');
        else
          coldiv.text(sumScore / data[i][3].length);
        coldiv.appendTo(itemdiv);

        itemdiv.appendTo(itemTable);
      }
},
  createItem: function (event) {
    var itemName;
    // TODO: 从event中获取itemName
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var a = accounts[0];
      App.contracts.Review.deployed().then(instance => {
        return instance.createItem(itemName, { from: a });
      }).catch(err => console.log(err.message));
    });
  },

makeComment: function (i, j, k, event) {
  let itemID = i;
  let rating = j;
  let content = k;
  // TODO: 从event中获取
  web3.eth.getAccounts(function (error, accounts) {
    if (error) {
      console.log(error);
    }
    var a = accounts[0];
    App.contracts.Review.deployed().then(instance => {
      return instance.makeComment(itemID, rating, content, { from: a });
    }).catch(err => console.log(err.message));
  });
},

readItem: async function (i, event) {
  let itemID = i;
  // TODO: 从event中获取
  let instance = await App.contracts.Review.deployed();
  return await instance.readItem.call(itemID);

}
  // markAdopted: function () {
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function(instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });

  // },

  // handleAdopt: function (event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   var adoptionInstance;

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.Adoption.deployed().then(function(instance) {
  //       adoptionInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return adoptionInstance.adopt(petId, {from: account});
  //     }).then(function(result) {
  //       return App.markAdopted();
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   });
  // }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
