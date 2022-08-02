var myLibrary = [];

function Book(title, author, pages, readStatus) {
	this.id = myLibrary.length;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readStatus = readStatus;
}

function updateBookIDS() {
	myLibrary.forEach((book) => {
		book.id = myLibrary.indexOf(book);
	});
}

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
	for (const libraryBook of myLibrary) {
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
		bookReadStatus.innerHTML = libraryBook.readStatus ? "read" : "not read";
		bookRow.appendChild(bookReadStatus);

		let bookMarkRead = document.createElement("td");
		let markReadButton = document.createElement("button");
		markReadButton.innerHTML = libraryBook.readStatus ? "Not Read" : "Read";
		markReadButton.addEventListener("click", () => {
			let bookID =
				markReadButton.parentElement.parentElement.getAttribute("id");

			myLibrary.forEach((book) => {
				if (book.id == bookID) {
					book.readStatus = !book.readStatus;
				}
			});

			updateLibraryTable();
		});
		bookMarkRead.appendChild(markReadButton);
		bookRow.appendChild(bookMarkRead);

		let bookEditButton = document.createElement("td");
		let editButton = document.createElement("button");
		editButton.innerHTML = "Remove";
		editButton.addEventListener("click", () => {
			let bookID =
				editButton.parentElement.parentElement.getAttribute("id");
			myLibrary = myLibrary.filter((book) => book.id != bookID);
			updateLibraryTable();
		});
		bookEditButton.appendChild(editButton);
		bookRow.appendChild(bookEditButton);

		tableBody.appendChild(bookRow);
	}
	return tableBody;
}

function updateLibraryTable() {
	updateBookIDS();
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
	myLibrary.push(new Book(title, author, pages, readStatus));
}

document.querySelector("#bookAddButton").addEventListener("click", () => {
	addBookToLibrary();
	updateLibraryTable();
});

myLibrary.push(new Book("title", "author", "pages", true));
myLibrary.push(new Book("title", "author", "pages", false));
updateLibraryTable();
