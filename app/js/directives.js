'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }]).
	directive('psTree', function ($compile, $document, $log) {
//		$log.
		return {
			compile: function (elem, attrs) {
				var tree;// = initTree(elem, attrs, $compile, $document);

				return function (scope, elem, attrs) {
//					loadTree(scope, tree, elem, tree.treeModelWatch);
				}
			}
		};
	}).
  directive('psTreeold', function ($compile, $document) {

    function getItemTemplate(document, treeElem){
      var itemTemplate;

      while(treeElem.childNodes.length > 0){
        var childNode = treeElem.childNodes[0];

        treeElem.removeChild(childNode);
        if(childNode.nodeName === 'LI'){
          if(itemTemplate){
            throw new Error('Tree ul must contain only a single li template');
          }

//          var createWrapper = childNode.childNodes.length === 0;

	        var createWrapper = childNode.childNodes.length === 0;
	        var innerNodes = 0;

	        for (var i = 0; i < childNode.childNodes.length; i += 1) {
		        var innerNode = childNode.childNodes[i];

		        if (innerNode.nodeName === '#text') {
			        if (! /^\s*$/.test(innerNode.nodeValue)) {
				        createWrapper = true;
				        break;
			        }
		        } else if (innerNodes > 0) {
			        createWrapper = true;
			        break;
		        } else {
			        innerNodes += 1;
		        }
	        }

	        if (createWrapper) {
		        var wrapperEl = document.createElement('DIV');

		        while (childNode.childNodes.length > 0) {
			        wrapperEl.appendChild(childNode.childNodes[0]);
		        }

		        childNode.appendChild(wrapperEl);
	        }

          var ulEL = document.createElement('UL');
          childNode.appendChild(ulEL);

          itemTemplate = angular.element(childNode);
          itemTemplate.addClass('ps-tree-node');
        }
      }
      return itemTemplate || angular.element('<li class="ps-tree-node"><div>{{node.id}}</div><ul></ul></li>');
    }

    function initTree(treeElem, attrs, $compile, $document) {
      var treeModelExpr = attrs.src || attrs.psTree;
      var itemTemplate = getItemTemplate($document[0], treeElem[0]);
      var contextName = 'node';

      var tree = {
        rootElem: treeElem,
        treeModelExpr: treeModelExpr,
        itemTemplate: $compile(itemTemplate),
        contextName: contextName,
        treeModelWatch: function(scope){ return scope.$eval(treeModelExpr);},
        collectionWatch: function(scope){ return scope.$eval('node.children');},
//        collectionWatch: function(scope){ return scope.$eval('angular.isArray(item)?"a":"b"');},

        getItem: function(scope){
            return scope.$eval(this.contextName);
        },
        setItem: function(scope, value){
            scope[this.contextName] = value;
        }
      };



      return tree;
    }

    function insertListItem(listElem, itemElem, index) {
      if(index<0){
        listElem.append(itemElem);
      }else if(index === 0){
        listElem.prepend(itemElem);
      }else{
        listElem.children().eq(index-1).after(itemElem);
      }
    }

    function addListItem(scope, tree, listElem, item, index, key) {

      var itemScope = scope.$new();
      //TODO: replace collectionExp (based on var name) watch with type detecting watch that watches if type is a collection type



      console.info('item:',item);
	    if(item instanceof Array){
	      var id = angular.isNumber(key)?key+ ' : ' + 'Array':'Array';
	      id += ' ['+item.length+']'
        console.info("item is array:", item);
        tree.setItem(itemScope, {id: id, children: item});
//        tree.setItem(itemScope, item);
        //run template function to get compiled template
        var itemElem = tree.itemTemplate(itemScope, angular.noop);
        //expand UL t
        insertListItem(listElem, itemElem, index);

        var childrenListElem = itemElem.children().eq(0);
        //continue from UL
        loadTree(itemScope, tree, childrenListElem, tree.collectionWatch);

//        addListItem(scope, tree, listElem, item, index);
       /* angular.forEach(item, function(subItem, subIndex){
          console.info("subItem:", subItem);
          tree.setItem(itemScope, subItem);

          var itemElem = tree.itemTemplate(itemScope, angular.noop);

          addListItem(itemScope, tree, itemElem, )
          insertListItem(listElem, itemElem, index);

          var childrenListElem = itemElem.children().eq(0);

          loadTree(itemScope, tree, itemElem, tree.collectionWatch);
        })*/

      }else if(angular.isObject(item)){
		    var id = angular.isNumber(key)?key+ ' : ' + 'Object':'Object';
		    id += ' {'+Object.keys(item).length+'}'
		    console.info("item is object:", item);
		    tree.setItem(itemScope, {id: id, children: item});
//        tree.setItem(itemScope, item);
		    //run template function to get compiled template
		    var itemElem = tree.itemTemplate(itemScope, angular.noop);
		    //expand UL t
		    insertListItem(listElem, itemElem, index);

		    var childrenListElem = itemElem.children().eq(0);
		    //continue from UL
		    loadTree(itemScope, tree, childrenListElem, tree.collectionWatch);
	    }else{
	      var id = angular.isNumber(key)?key+ ' : ' + item:item;
        console.info("item is NO array:", item);
        tree.setItem(itemScope, {id: id});

        var itemElem = tree.itemTemplate(itemScope, angular.noop);

        insertListItem(listElem, itemElem, index);

      }
    }

    /**
     * @function
     * @param scope
     * @param tree
     * @param {JQLite[]} listElem The item in the dom representing the directive.
     * @param {function} listWatch Watch function for the tree model.
     */
    function loadTree(scope, tree, listElem, listWatch) {
      scope.$watch(listWatch, function(newList, oldList){
        if(typeof newList === 'undefined' || newList === null || newList.length === 0){
          listElem.children().remove;
          return;
        }

        angular.forEach(newList, function(item, itemIndex){
          var listChildElems = listElem.children();

          if(itemIndex >= listChildElems.length){
            addListItem(scope, tree, listElem, item, -1, itemIndex);
            return;
          }

          for(var childElemIndex = itemIndex; childElemIndex < listChildElems.length; childElemIndex += 1){
            var childElem = angular.element(listChildElems[childElemIndex]);
            var childItem = tree.getItem(childElem.scope());

            if(childItem === item){
              break;
            }
          }

          if(childElemIndex >= listChildElems.length){
            addListItem(scope, tree, listElem, item, itemIndex);
          }else if (childElemIndex !== itemIndex){
            insertListItem(listElem, listChildElems[childElemIndex], itemIndex);
          }

          while(listElem.children().length > newList.length){
            var removeElem = listElem.children().eq(newList.length);
            removeElem.remove();
          }

          throw new Error('here');

          //TODO: for(var childElemIndex = itemIndex; child)
        })
      }, true)
    }

    return {
      compile: function (elem, attrs) {
        var tree = initTree(elem, attrs, $compile, $document);

        return function (scope, elem, attrs) {
          loadTree(scope, tree, elem, tree.treeModelWatch);
        }
      }
    };
  });
