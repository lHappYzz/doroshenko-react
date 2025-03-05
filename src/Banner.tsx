import Slider from 'react-slick';
// import img from "./assets/img.png";
import img from "./assets/slide-img.svg";

import './Banner.css';

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-block">
            <Slider arrows={false} {...settings}>
                <div>
                    <div className="banner">
                    <div className="info-block">
                        <div className="title">
                            Курси становлення ефективних <span className="color-text">лідерів</span>
                        </div>
                        <div className="content">
                            Інститут Лідерства, Управління та Коучингу допоможе тобі стати ефективним лідером, який розвиває свою організацію та зрощує наступне покоління лідерів
                        </div>
                        <div className="button-block">
                            <a href="#" className="btn-actual">Актуальні</a>
                            <a href="#" className="btn-courses">Усі курси</a>
                        </div>
                    </div>
                    <div className="image">
                        <img src={img} alt="banner image" />
                    </div>
                </div>
                </div>
                <div>
                    <h3>SLIDE 2</h3>
                </div>
                <div>
                    <h3>SLIDE 3</h3>
                </div>
            </Slider>
        </div>
    );
};

export default Banner;

