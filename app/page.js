"use client";
import { useState, useEffect } from "react";
import booksData from "../data/booksData.json";

export default function Home() {
	const [books, setBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [cart, setCart] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const [showBookModal, setShowBookModal] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);

	useEffect(() => {
		setBooks(booksData);
	}, []);

	const openBookModal = (book) => {
		setSelectedBook(book);
		setShowBookModal(true);
	};

	const removeFromCart = (bookToRemove) => {
		setCart((prevCart) => {
			const book = prevCart.find((item) => item.id === bookToRemove.id);
			if (book.quantity > 1) {
				return prevCart.map((item) =>
					item.id === book.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			} else {
				return prevCart.filter((item) => item.id !== book.id);
			}
		});
	};

	const addToCart = (book) => {
		setCart((prevCart) => {
			// Check if the book is already in the cart
			const existingBookIndex = prevCart.findIndex(
				(item) => item.id === book.id
			);

			if (existingBookIndex >= 0) {
				// If the book is already in the cart, create a new array where the existing book's quantity is incremented
				const updatedCart = [...prevCart];
				updatedCart[existingBookIndex] = {
					...updatedCart[existingBookIndex],
					quantity: updatedCart[existingBookIndex].quantity + 1,
				};
				return updatedCart;
			} else {
				// If the book is not in the cart, add it with a quantity of 1
				return [...prevCart, { ...book, quantity: 1 }];
			}
		});
	};

	const completePurchase = () => {
		setCart([]);
		setShowCart(false);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	const filteredBooks = books.filter(
		(book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "All" || book.category === selectedCategory)
	);

	const categories = ["All", ...new Set(books.map((book) => book.category))];

	return (
		<div className="container mx-auto px-4">
			<header className="text-center py-6 flex justify-center">
				<div className="flex-1">
					<h1 className="text-4xl font-bold">My Bookstore</h1>
					<p className="text-gray-500">everything books</p>
				</div>
				<button
					onClick={() => setShowCart(true)}
					className="text-slate-800 rounded font-bold"
				>
					Cart ({cart.length})
				</button>
			</header>
			{showCart && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded">
						<h2 className="text-2xl font-bold mb-4">Cart</h2>
						{cart.map((book) => (
							<div
								key={book.title}
								className="flex justify-between items-center mb-2"
							>
								<p>
									{book.title} (x{book.quantity})
								</p>
								<div>
									<button
										onClick={() => addToCart(book)}
										className="p-2 bg-blue-500 text-white rounded"
									>
										+
									</button>
									<button
										onClick={() => removeFromCart(book)}
										className="p-2 bg-red-500 text-white rounded"
									>
										-
									</button>
								</div>
							</div>
						))}
						<div className="flex justify-between">
							<button
								onClick={completePurchase}
								className="p-2 bg-green-500 text-white rounded mt-4"
							>
								Complete Purchase
							</button>
							<button
								onClick={() => setShowCart(false)}
								className="p-2 bg-gray-500 text-white rounded mt-4"
							>
								Exit Cart
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="my-4">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="p-2 border border-gray-300 rounded"
				/>
				<select
					value={selectedCategory}
					onChange={handleCategoryChange}
					className="p-2 border border-gray-300 rounded ml-2"
				>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
			<div className="grid grid-cols-4 gap-4">
				{filteredBooks.map((book) => (
					<div key={book.title} className="border p-4 rounded">
						<img
							src={book.imageUrl}
							alt={book.title}
							className="w-full h-64 object-cover mb-4 cursor-pointer"
							onClick={() => openBookModal(book)}
						/>
						<h2 className="font-bold">{book.title}</h2>
						<p>{book.author}</p>
						<p className="text-gray-500">{book.category}</p>
						<button
							onClick={() => addToCart(book)}
							className="p-2 bg-blue-500 text-white rounded mt-2"
						>
							Add to cart
						</button>
					</div>
				))}
			</div>
			{showBookModal && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded gap-2 flex flex-col">
						<h2 className="text-2xl font-bold mb-4">
							{selectedBook.title}
						</h2>
						<img
							src={selectedBook.imageUrl}
							alt={selectedBook.title}
							className="w-full h-64 object-cover mb-4"
						/>
						<p>{selectedBook.author}</p>
						<p className="text-gray-500">{selectedBook.category}</p>
						<p>{selectedBook.description}</p>
						<div className="flex justify-between items-center">
							<button
								onClick={() => setShowBookModal(false)}
								className="p-2 bg-gray-500 text-white rounded"
							>
								Close
							</button>
							<p className="text-center">
								Stock: {selectedBook.stock}
							</p>
							<button
								onClick={() => addToCart(selectedBook)}
								className="p-2 bg-blue-500 text-white rounded mt-2"
							>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
