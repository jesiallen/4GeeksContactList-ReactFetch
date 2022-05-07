import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		id: '',
	});
	const { store, actions } = useContext(Context);


	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts ? store.contacts.map((individual, index)=>{
							return( 
								<ContactCard 
									key={index}
									person={individual}
									onDelete={() => setState({ showModal: true, id: individual.id })} 
								/> 
							)
						})
						: 'waiting'
					}

					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id}  onClose={() => setState({ showModal: false })} />
		</div>
	);
};
