import React,{useEffect, useState} from 'react';
import {FiPower,FiTrash2} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import Api from '../../services/api';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(()=>{
    Api.get('profile',{
      headers:{
        Authorization: ongId,
      }
    }).then(response=>{
      setIncidents(response.data);
    })
  },[ongId]);

  async function handleDeleteIncident(id){
    try{

      await Api.delete(`/incidents/${id}`,{
        headers:{
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id !== id));
    }catch(err){
      alert('Error ao Deletar');
    }
  }

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt='Be The Hero'/>
        <span>Bem Vinda, {ongName}</span>

        <Link className='button' to='/profile/new'>Cadastrar novo caso</Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color="#E02042"/>
        </button> 
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident=>(
        <li key={incident.id}>        
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>
            
          <strong>VALOR:</strong>
          <p>{`R$ ${incident.value}`}</p>
            
          <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color='#a8a8b3' />
          </button>
          
        </li>
        ))}
      </ul>
    </div>
  )
}