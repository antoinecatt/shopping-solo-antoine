'use strict';

const STORE = [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  const shoppingListItemsString = generateShoppingItemsString(STORE);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
 
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getSearchItem(item) {
  console.log(`Searching ${item}`);
  // get data from array
  STORE.find(item => item.name === item);
   
}

function handleSearchItem() {
  $('#js-shopping-list-search').submit(function(e) {
    e.preventDefault();
    // store info in a variable and spit return the values of searched item
    console.log('`handleSearchItem` ran');
    const searchedItem = $('.js-shopping-list-search').val(); 
    // change the store
    getSearchItem(searchedItem);
    // render the whole page;
    renderShoppingList();
  })
}


function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function deleteItemClicked(itemIndex) {
  console.log('Deleting item from index' + itemIndex);
  STORE.splice(itemIndex,1);
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    deleteItemClicked(itemIndex);
    renderShoppingList();
  });
}
let check = false;

function checkBoxToggle() {
  // Shows unchecked items
  $('.js-shopping-list-check').change(function() {
    // Should show unchecked items when checkbox is clicked
    // STORE.checked = !STORE.checked;
    if(!check) { 
    $('.shopping-item__checked').closest('li').hide();
    check = true;
    } else {
      $('.shopping-item__checked').closest('li').show();
      check = false;
    }
  });
}



// function edit() {
//   // edit name of list item
// }



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  checkBoxToggle();
  handleSearchItem();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);