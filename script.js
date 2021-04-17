// your code

let userData;

let currentActiveClass = document.querySelector('.btn-container').children[0];
currentActiveClass.classList.add('active');
const search = document.querySelector('.search');
const minPrice = document.querySelector('#min');
const maxPrice = document.querySelector('#max');
const section = document.querySelector('.section-center');

async function getData() {
	const response = await fetch(
		'https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json'
	);
	userData = await response.json();
	renderMenu(userData);
	console.log(userData);
	callBtn();
}
getData();
let data;
function renderMenu(arr) {
	section.innerHTML = '';
	for (let i = 0; i < arr.length; i++) {
		section.innerHTML += ` 
                <article  id="${arr[i].id}" class="menu-item" category="${arr[i].category}" >
                    <img src='${arr[i].img}' class="photo" alt="${arr[i].title}" />
                        <div class="item-info">
                            <header>
                            <h4>${arr[i].title}</h4>
                            <h4 class="price">$${arr[i].price}</h4>
                            </header>
							<p class="item-text">${arr[i].desc}</p>
						</div>	
					<div class="a-cart"><button id="${arr[i].id}"class="cart">Add to cart</button></div>	
				</article>	`;
	}
}

// all menu button rendered
const all = document.querySelectorAll('.filter-btn');
for (let i = 0; i < all.length; i++) {
	all[i].addEventListener('click', renderCurrentCategory);
}
function renderCurrentCategory(e) {
	let currentEvent = e.target;
	currentActiveClass.classList.remove('active');
	currentActiveClass = e.target;
	currentActiveClass.className = 'filter-btn active';

	let breakfast = userData.filter((item, category) => {
		return item.category == 'breakfast';
	});

	let lunch = userData.filter((item, category) => {
		return item.category == 'lunch';
	});

	let shakes = userData.filter((item, category) => {
		return item.category == 'shakes';
	});

	let dinner = userData.filter((item, category) => {
		return item.category == 'dinner';
	});

	console.log(currentEvent.innerHTML);
	console.log(currentEvent.innerHTML.trim());
	switch (currentEvent.innerHTML.trim()) {
		case 'all':
			renderMenu(userData);
			callBtn()
			break;
		case 'breakfast':
			data = breakfast;
			console.log(breakfast)
			renderMenu(breakfast);
			callBtn()
			break;
		case 'lunch':
			data = lunch;
			console.log("lunch",data)
			renderMenu(lunch);
			callBtn();
				break;
			case 'shakes':
				data = shakes;
				renderMenu(shakes);
				console.log(shakes);
				callBtn()

				break;
			case 'dinner':
				data = dinner;
				renderMenu(dinner);
				console.log(dinner)
				callBtn();
				break;
		}
}

search.addEventListener('keyup', entered);
function entered(e) {
	var val = search.value;
	let newItem = userData.filter(
		(item) =>
			item.title.toLowerCase().includes(val.toLowerCase()) ||
			item.desc.toLowerCase().includes(val.toLowerCase())
	);
	console.log('new', newItem);
	renderMenu(newItem);
	callBtn();
}

// ==
document.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {
		pricing()
		minPrice.value = '';
		maxPrice.value = '';
	}
});

maxPrice.addEventListener('click', pricing);
function pricing(e) {
	var maximum = Number(maxPrice.value);
	var min = Number(minPrice.value);

	let between = userData.filter((item) => {
		return item.price < maximum && item.price > min

	});
	renderMenu(between);
	callBtn()
}

// adding cart
const incartList = document.querySelector('.inCart');
var total = 0;
let count=1
function callBtn() {
	const aCartBtns = document.querySelectorAll('.cart');
	aCartBtns.forEach((abutton) => {
		abutton.addEventListener('click', (event) => {
			event.preventDefault();
			let current = event.target;
			current.innerHTML = 'in cart';
			let currentId = current.id;
			quantity.innerHTML = `${count++}`;
			let n=userData.filter(el => {
				if (el.id ==currentId) {
					return true
				}
			})
			console.log(n[0].price)
			// incartList.innerHTML += `<li class="in-cart">${n[0].title} ${n[0].price}</li>`;
			total += Number(n[0].price)
			totalPrice.innerHTML = `Total Price : ${total.toFixed(2)}`
			const submit = document.querySelector(".total")
			submit.style.display="unset"

		});
	})
}
let quantity = document.querySelector('.quantity');
let totalPrice = document.querySelector('.total');
