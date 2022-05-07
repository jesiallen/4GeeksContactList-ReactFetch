const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getInfo: () => {
				fetch('https://assets.breatheco.de/apis/fake/contact/agenda/jesi_allen')
					.then((response) => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(data => setStore({ 'contacts': data }))
					.catch((err) => console.log(err));
			},

			addNewContact: ((newContact) => {
				fetch('https://assets.breatheco.de/apis/fake/contact/', {
					method: 'POST',
					body: JSON.stringify(
						{
							"full_name": newContact.full_name,
							"email": newContact.email,
							"agenda_slug": "jesi_allen",
							"address": newContact.address,
							"phone": newContact.phone
						},
						),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then((response) => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(response => {
						console.log('Success:', response);
						getActions().getInfo();})
					.catch(error => console.error(error))
				}),
				
				deleteContact: (toDelete) => {
					fetch(`https://assets.breatheco.de/apis/fake/contact/${toDelete}`, {
						method: 'DELETE',
						})
						.then((response) => {
							if (!response.ok) {
								throw new Error(response.statusText);
							}
							return response.json();
						})
						.then(response => {
							console.log('Success:', response);
							getActions().getInfo();})
						.catch(error => console.error(error))
					// let newContactList = getStore().contacts;
					// let filteredList = newContactList.filter((contact, index) => id != contact.id);
					
					// setStore({ contacts: filteredList });
				},
				
				editContact: (changedContact) => {
					fetch(`https://assets.breatheco.de/apis/fake/contact/${changedContact.id}`, {
						method: 'PUT',
						body: JSON.stringify(
							{
								"full_name": changedContact.full_name,
								"email": changedContact.email,
								"agenda_slug": "jesi_allen",
								"address": changedContact.address,
								"phone": changedContact.phone
							},
							),
							headers: {
								'Content-Type': 'application/json'
							}
						})
						.then((response) => {
							if (!response.ok) {
								throw new Error(response.statusText);
							}
							return response.json();
						})
						.then(response => {
							console.log('Success:', response);
							getActions().getInfo();})
						.catch(error => console.error(error))
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
