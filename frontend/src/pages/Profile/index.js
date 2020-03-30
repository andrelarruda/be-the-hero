import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
   const [incidents, setIncidents] = useState([]);

   const history = useHistory();

   const ongId = localStorage.getItem('ongId');
   const ongName = localStorage.getItem('ongName');

   // useEffect é usado para disparar alguma ação em algum determinado momento em que o componente é executado. No primeiro parâmetro temos a função que será executada. E no segundo recebemos um array com a(s) variável(eis) que vai(ão) disparar a chamada da função. Ou seja, toda vez que uma (ou todas) das variáveis mudar, a função será executada.
   // Se declararmos um array vazio (no 2º parâmetro), a função será executada apenas uma vez. idOng teste: 26696a58
   useEffect(() => {
      api.get('profile', {
         headers: {
            Authorization: ongId,
         }
      }).then(response => {
         setIncidents(response.data);
      })
   }, [ongId]);

   async function handleDeleteIncident(id) {
      try {
         await api.delete(`incidents/${id}`, {
            headers: {
               Authorization: ongId,
            }
         });
         /* 
         * Para atualizar em tempo real a lista de casos, deve-mos atualizá-la manualmente. O que pode ser feito de duas formas:
         *1. Recarregar todos os dados da API. Colocando o trecho do código que está em useEffect numa função e chamando essa função depois que deletar o caso.
         *2. Simplesmente retira da lista incidents o caso removido (através do id).
         *  Neste caso o método abordado aqui é o 2. Conforme código abaixo:
         */
         setIncidents(incidents.filter(incident => incident.id !== id));

         return
      } catch (err) {
         alert('Erro ao deletar caso.');
      }

   }

   function handleLogout() {
      localStorage.clear();

      history.push('/');
   }

   return (
      <div className="profile-container">
         <header>
            <img src={logoImg} alt="Be The Hero" />
            <span>Bem vinda, {ongName}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
               <FiPower size={18} color="#E02041" />
            </button>
         </header>

         <h1>Casos cadastrados</h1>

         <ul>
            {incidents.map(incident => (
               <li key={incident.id}>
                  <strong>CASO:</strong>
                  <p>{incident.title}</p>

                  <strong>DESCRIÇÃO:</strong>
                  <p>{incident.description}</p>

                  <strong>VALOR</strong>
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                  <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                     <FiTrash2 size={20} color="#a8a8b3" />
                  </button>
               </li>
            ))}
         </ul>

      </div>
   );
}