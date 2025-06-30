import React, { useEffect, useState } from 'react';
import './category.css';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';

const Category = () => {
  const { categoryName } = useParams();
  const [apiCategory, setApiCategory] = useState('popular');

  useEffect(() => {
    switch (categoryName.toLowerCase()) {
      case 'tv show':
        setApiCategory('top_rated');
        break;
      case 'movies':
        setApiCategory('popular');
        break;
      case 'new & popular':
        setApiCategory('upcoming');
        break;
      case 'my list':
        setApiCategory('now_playing');
        break;
      case 'browse by languages':
        setApiCategory('popular');
        break;
      default:
        setApiCategory('popular');
    }
  }, [categoryName]);

  return (
    <div className="category-page">
      <Navbar />
      <h2 className="category-header">{categoryName}</h2>
      <div className="category-cards-wrapper">
        <TitleCards title={categoryName} category={apiCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default Category;
