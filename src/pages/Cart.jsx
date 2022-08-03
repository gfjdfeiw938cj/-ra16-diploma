import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {countItems} from "../thunks/cartThunk";
import getStorageItems from "../tools/localStorage"
import Preloader from "../components/Preloader";

export default function Cart() {

  const dispatch = useDispatch();
  const miniLocalStorage = getStorageItems();
  const [totalPrice, setTotalPrice] = useState(0);
  const [storage, setStorage] = useState(miniLocalStorage);
  const [contacts, setContacts] = useState({"phone": "", "address": ""});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    setTotalPrice(new Intl.NumberFormat('ru-RU').format(storage.reduce((prev, next) => prev + +next.price * +next.quantity, 0)));
    dispatch(countItems(storage.reduce((prev, next) => prev + +next.quantity, 0)));
  }, [dispatch, storage]);

  const hanldeDelete = (nanoId) => {
    const newStorage = storage.filter(item => item.nano !== nanoId)
    localStorage.setItem('items', JSON.stringify(newStorage));
    setStorage(newStorage)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setContacts(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOrder = e => {
    e.preventDefault();
    setLoading(true)
    const orderObject = {
      owner: contacts,
      items: storage.map(item => ({
        id: +item.id,
        price: item.price,
        count: item.quantity
      }))
    }
    if(validateForm(e.target) === 0) {
      fetch(process.env.REACT_APP_URL + '/api/order',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderObject)
        }
      )
        .then(request => {
          if (request.ok) {
            setMessage('Ваш заказ успешно отправлен!')
            setLoading(false)
            localStorage.removeItem('items');
            setStorage([])
          } else {
            return;
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const validateForm = form => {
    let errorsCount = 0;
    if(form.querySelector('.tooltip2')) {
      form.querySelector('.tooltip2').remove();

    }
    const phoneInput = form.querySelector('#phone');
    const addressInput = form.querySelector('#address');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip2');
    tooltip.classList.add('alert');
    tooltip.classList.add('alert-danger');
    if(contacts.phone.trim() === '') {
      tooltip.innerText = "Телефон не может быть пустым";
      phoneInput.after(tooltip);
      errorsCount += 1;
    }
    //eslint-disable-next-line
    if(!(/^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/.test(contacts.phone))) {
      tooltip.innerText = "Телефон должен состоять из цифр";
      phoneInput.after(tooltip);
      errorsCount += 1;
    }
    if(contacts.address.trim() === '') {
      tooltip.innerText = "Адрес не может быть пустым";
      addressInput.after(tooltip);
      errorsCount += 1;
    }
    return errorsCount;
  }

  return (
    <>
      {storage && storage.length > 0 ? '' : <h1>Корзина  пуста</h1>}
      {message && <div className="alert alert-success">{message}</div>}
      {loading ? <Preloader/> : '' }
      {storage && storage.length > 0 &&
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
          </thead>
          <tbody>
          {storage.map(item =>
            <tr key={item.nano}>
              <td>{item.id}</td>
              <td><Link to={`/products/${item.id}`}>{item.title}</Link></td>
              <td>{item.activeSize}</td>
              <td>{item.quantity}</td>
              <td>{new Intl.NumberFormat('ru-RU').format(item.price)}</td>
              <td>{new Intl.NumberFormat('ru-RU').format(item.price * item.quantity)} руб.</td>
              <td>
                <button className="btn btn-outline-danger btn-sm" onClick={() => hanldeDelete(item.nano)}>Удалить</button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{totalPrice} руб.</td>
          </tr>
          </tbody>
        </table>
      </section>}
      {storage && storage.length > 0 &&
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: 30 + 'rem', margin: 0 + 'auto'}}>
          <form className="card-body" onSubmit={handleOrder}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" name="phone" id="phone" placeholder="Ваш телефон" value={contacts.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" name="address" id="address" placeholder="Адрес доставки" value={contacts.address} onChange={handleChange} />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" required />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>
      }
    </>
  )
}
