import productData from './data/full-products';

function App() {
  return (
    <div className="App">
      <h1>Hello There.</h1>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// MOCK DATA
const mockProducts = [
  { id: 1, name: 'Product A', description: 'This is Product A.', tags: ['tech', 'new'] },
  { id: 2, name: 'Product B', description: 'This is Product B.', tags: ['fashion'] },
  { id: 3, name: 'Product C', description: 'This is Product C.', tags: ['tech'] },
  { id: 4, name: 'Product D', description: 'This is Product D.', tags: ['home'] },
  { id: 5, name: 'Product E', description: 'This is Product E.', tags: ['fashion', 'sale'] },
  { id: 6, name: 'Product F', description: 'This is Product F.', tags: ['tech'] },
  { id: 7, name: 'Product G', description: 'This is Product G.', tags: ['home'] },
  { id: 8, name: 'Product H', description: 'This is Product H.', tags: ['new'] },
  { id: 9, name: 'Product I', description: 'This is Product I.', tags: ['sale'] },
  { id: 10, name: 'Product J', description: 'This is Product J.', tags: ['tech'] },
  { id: 11, name: 'Product K', description: 'This is Product K.', tags: ['fashion'] },
];

// COMPONENTS

const ProductCard = ({ product }) => (
  <div className="pa3 ma2 bg-light-gray br2 shadow-1 w-100 w-50-m w-25-l">
    <Link to={`/product/${product.id}`} className="black no-underline">
      <h2>{product.name}</h2>
      <p>{product.tags.join(', ')}</p>
    </Link>
  </div>
);

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => (
  <div className="pa3">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={`pa2 ma1 ba br2 ${currentPage === i + 1 ? 'bg-dark-blue white' : 'bg-white'}`}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTag, setSearchTag] = useState('');
  const productsPerPage = 4;

  const filtered = searchTag
    ? mockProducts.filter(p => p.tags.includes(searchTag.toLowerCase()))
    : mockProducts;

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(start, start + productsPerPage);

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 on tag change
  }, [searchTag]);

  return (
    <div className="pa4">
      <h1 className="f2">Products</h1>

      <input
        type="text"
        placeholder="Filter by tag (e.g. tech, home)"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className="pa2 input-reset ba b--black-20 mb3 w-100 w-50-m"
      />

      <div className="flex flex-wrap">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) return <div className="pa4">Product not found.</div>;

  return (
    <div className="pa4">
      <Link to="/" className="link blue underline">← Back to Products</Link>
      <h1 className="f2 mt3">{product.name}</h1>
      <p>{product.description}</p>
      <p className="i gray">Tags: {product.tags.join(', ')}</p>
    </div>
  );
};

// ✅ MAIN APP COMPONENT
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
