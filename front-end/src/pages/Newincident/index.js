import React,{useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import Api from '../../services/api';

export default function Newincident(){
  const [title, setTitle] = useState(['']);
  const [description, setDescription] = useState(['']);
  const [value, setValue] = useState(['']);

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try{
      await Api.post('incidents',data,{
        headers:{
          Authorization: ongId,
        }
      })

      history.push('/profile');
    }catch(err){
      alert('Não foi possivel cadastrar, Tente novamente!')
    }
  }

  return(
    <div className="newincident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resoler isso.</p>

          <Link className="back-link" to='/profile'>
            <FiArrowLeft size={16} color='#E02042'/>
            Voltar para Home
          </Link>
          
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titulo do Caso"
            />
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
            />
          <input 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
            />
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}