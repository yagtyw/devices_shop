import { useState, useEffect, useRef } from 'react';
import './Header.scss';
import bannerImage from '../assets/banner.png'; // Импортируем картинку

const Header = () => {
  const items = ["12-Month Warranty", "Innovate with Artistic Vision"];
  const [repeatedItems, setRepeatedItems] = useState(items);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const containerWidth = list.parentElement.offsetWidth;
    let currentWidth = 0;

    // Функция для расчета ширины списка
    const calculateWidth = () => {
      const tempList = document.createElement('ul');
      tempList.style.visibility = 'hidden';
      tempList.style.position = 'absolute';
      tempList.style.whiteSpace = 'nowrap';
      document.body.appendChild(tempList);

      items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.style.margin = '0 78px'; // Учитываем отступы
        tempList.appendChild(li);
        currentWidth += li.offsetWidth + 78; // Учитываем отступы
      });

      document.body.removeChild(tempList);
      return currentWidth;
    };

    // Функция для добавления повторяющегося текста
    const addRepeatedItems = () => {
      const itemWidth = calculateWidth();
      const repetitions = Math.ceil(containerWidth / itemWidth) + 1; // +1 для плавного перехода

      const newItems = [];
      for (let i = 0; i < repetitions; i++) {
        newItems.push(...items);
      }

      setRepeatedItems(newItems);
    };

    addRepeatedItems();

    // Обработка изменения размера окна
    const handleResize = () => {
      addRepeatedItems();
    };

    window.addEventListener('resize', handleResize);

    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  return (
    <header className="header">
      <div className="header__panel">
        <ul className="header__list" ref={listRef}>
          {repeatedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </header>
  );
};


const TopMenu = () => {
    return (
        <section className="TopMenu">
            <div className="TopMenu__panel">
                <ul>
                    <li><a href="#">Keyboards</a></li>
                    <li><a href="#">Mice</a></li>
                    <li><a href="#">Earbuds</a></li>
                    <li><a href="#">Chargers</a></li>
                    <li><a href="#">More</a></li>
                    <li><span className="brandName">GalaxyStar</span></li>
                    <li><a href="#">Contact</a></li>
                    <li style={{ whiteSpace: 'nowrap' }}><a href="#">Discord Community</a></li>                    <li><a href="#">USD $</a></li>
                    <li><a href="#">Search</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </div>
        </section>
    );
};

export { Header, TopMenu };
