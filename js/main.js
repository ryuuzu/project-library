class Library {
	constructor(libraryName) {
		this._name = libraryName;
		this._books = [];
	}

	get books() {
		return this._books;
	}

	get name() {
		return this._name;
	}

	getNewBookID() {
		let newBookID;
		try {
			let lastBookID = this._books[this._books.length - 1].id;
		} catch (error) {
			newBookID = 0;
		}
		if (newBookID === undefined) {
			newBookID = this._books[this._books.length - 1].id + 1;
		}
		return newBookID;
	}
	addBook(title, author, pages, readStatus) {
		this._books.push(
			bookFactory(this.getNewBookID(), title, author, pages, readStatus)
		);
	}
	getBookByID(id) {
		return this._books.find((book) => book.id == id);
	}
	markBookRead(id) {
		getBookByID(id).changeReadStatus();
	}
	updateBookIDs() {
		return;
	}
	removeBookByID(id) {
		this._books = this._books.filter((book) => book.id != id);
	}
}

const myLibrary = new Library("Ryuuzu's Library");

class book {
	constructor(id, title, author, pages, readStatus) {
		this._id = id;
		this._title = title;
		this._author = author;
		this._pages = pages;
		this._readStatus = readStatus;
	}

	get id() {
		return this._id;
	}
	get title() {
		return this._title;
	}
	get author() {
		return this._author;
	}
	get pages() {
		return this._pages;
	}
	get readStatus() {
		return this._readStatus;
	}
	changeReadStatus() {
		this._readStatus = !this._readStatus;
	}
}

function bookFactory2(id, title, author, pages, readStatus) {
	const getReadStatus = () => {
		return readStatus;
	};
	const changeReadStatus = () => {
		readStatus = !readStatus;
	};
	return { id, title, author, pages, getReadStatus, changeReadStatus };
}

var booksToDisplay = myLibrary.books;

function getTableHeader() {
	let headerRow = document.createElement("tr");

	let idHead = document.createElement("th");
	idHead.innerHTML = "Book ID";
	headerRow.appendChild(idHead);

	let titleHead = document.createElement("th");
	titleHead.innerHTML = "Book Title";
	headerRow.appendChild(titleHead);

	let authorHead = document.createElement("th");
	authorHead.innerHTML = "Book Author";
	headerRow.appendChild(authorHead);

	let pagesHead = document.createElement("th");
	pagesHead.innerHTML = "Total Pages";
	headerRow.appendChild(pagesHead);

	let readStatusHead = document.createElement("th");
	readStatusHead.innerHTML = "Read Status";
	headerRow.appendChild(readStatusHead);

	let markRead = document.createElement("th");
	markRead.innerHTML = "Change Read Status";
	headerRow.appendChild(markRead);

	let editBook = document.createElement("th");
	editBook.innerHTML = "Edit";
	headerRow.appendChild(editBook);

	return document.createElement("thead").appendChild(headerRow);
}

function getTableBody() {
	let tableBody = document.createElement("tbody");
	for (const libraryBook of booksToDisplay) {
		let bookRow = document.createElement("tr");
		bookRow.setAttribute("id", libraryBook.id);

		let bookID = document.createElement("td");
		bookID.innerHTML = libraryBook.id;
		bookRow.appendChild(bookID);

		let bookTitle = document.createElement("td");
		bookTitle.innerHTML = libraryBook.title;
		bookRow.appendChild(bookTitle);

		let bookAuthor = document.createElement("td");
		bookAuthor.innerHTML = libraryBook.author;
		bookRow.appendChild(bookAuthor);

		let bookPages = document.createElement("td");
		bookPages.innerHTML = libraryBook.pages;
		bookRow.appendChild(bookPages);

		let bookReadStatus = document.createElement("td");
		bookReadStatus.innerHTML = libraryBook.getReadStatus()
			? "Read"
			: "Not Read Yet";
		bookRow.appendChild(bookReadStatus);

		let bookMarkRead = document.createElement("td");
		let markReadButton = document.createElement("button");
		markReadButton.innerHTML = libraryBook.getReadStatus()
			? "Not Read"
			: "Read";
		markReadButton.addEventListener("click", () => {
			let bookID =
				markReadButton.parentElement.parentElement.getAttribute("id");
			myLibrary.markBookRead(bookID);
			booksToDisplay = myLibrary.books;
			updateLibraryTable();
		});
		bookMarkRead.appendChild(markReadButton);
		bookRow.appendChild(bookMarkRead);

		let bookEditButton = document.createElement("td");
		let editButton = document.createElement("button");
		editButton.classList.add("editButton");
		editButton.innerHTML =
			'<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
		editButton.addEventListener("click", () => {
			let bookID =
				editButton.parentElement.parentElement.getAttribute("id");
			myLibrary.removeBookByID(bookID);
			booksToDisplay = myLibrary.books;
			updateLibraryTable();
		});
		bookEditButton.appendChild(editButton);
		bookRow.appendChild(bookEditButton);

		tableBody.appendChild(bookRow);
	}
	return tableBody;
}

function updateLibraryTable() {
	myLibrary.updateBookIDs();
	let booksList = document.querySelector(".booksList");
	let oldTable = document.querySelector(".librarytable");
	let newTable = document.createElement("table");
	newTable.classList.add("librarytable");

	newTable.appendChild(getTableHeader());
	newTable.appendChild(getTableBody());

	booksList.removeChild(oldTable);
	booksList.appendChild(newTable);
}

function addBookToLibrary() {
	let title = document.querySelector("#bookName").value;
	let author = document.querySelector("#bookAuthor").value;
	let pages = document.querySelector("#bookPages").value;
	let readStatus = document.querySelector("#read").checked ? true : false;
	myLibrary.addBook(title, author, pages, readStatus);
	toggleAddForm();
}

document.querySelector("#bookAddButton").addEventListener("click", () => {
	addBookToLibrary();
	updateLibraryTable();
});

myLibrary.addBook("The Hobbit", "J. R. R. Tolkien", "304", false);
myLibrary.addBook(
	"Harry Potter and The Philoshopher's Stone",
	"J.K. Rowling",
	"223",
	true
);
myLibrary.addBook("The Lord of The Rings", "J. R. R. Tolkien", "1178", true);
myLibrary.addBook("The Silmarillion", "J. R. R. Tolkien", "412", false);
myLibrary.addBook(
	"The Fellowship of The Ring",
	"J. R. R. Tolkien",
	"423",
	true
);
myLibrary.addBook("The Two Towers", "J. R. R. Tolkien", "352", true);
booksToDisplay = myLibrary.books;
updateLibraryTable();

let form = document.querySelector(".newBookForm");
let overlay = document.querySelector(".overlay");
let sortOption = document.querySelector("#sorting");

function toggleAddForm() {
	form.classList.toggle("visible");
	overlay.classList.toggle("active");
}

sortOption.addEventListener("change", (event) => {
	switch (event.target.value) {
		case "sortByID":
			booksToDisplay = myLibrary.books.sort((a, b) => a.id - b.id);
			updateLibraryTable();
			break;
		case "sortByIDDesc":
			booksToDisplay = myLibrary.books.sort((a, b) => b.id - a.id);
			updateLibraryTable();
			break;
		case "sortByLength":
			booksToDisplay = myLibrary.books.sort((a, b) => a.pages - b.pages);
			updateLibraryTable();
			break;
		case "sortByLengthDesc":
			booksToDisplay = myLibrary.books.sort((a, b) => b.pages - a.pages);
			updateLibraryTable();
			break;
		case "sortByName":
			booksToDisplay = myLibrary.books.sort((a, b) => {
				const nameA = a.title.toUpperCase();
				const nameB = b.title.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			updateLibraryTable();
			break;
		case "sortByNameDesc":
			booksToDisplay = myLibrary.books.sort((a, b) => {
				const nameA = a.title.toUpperCase();
				const nameB = b.title.toUpperCase();
				if (nameA < nameB) {
					return 1;
				}
				if (nameA > nameB) {
					return -1;
				}
				return 0;
			});
			updateLibraryTable();
			break;
		default:
			break;
	}
});

document
	.querySelector(".newBookButton")
	.addEventListener("click", toggleAddForm);

document
	.querySelector("#closeAddForm")
	.addEventListener("click", toggleAddForm);
