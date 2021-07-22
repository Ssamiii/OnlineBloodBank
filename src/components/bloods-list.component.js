import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blood = props => (
	<tr>
		<td>{props.blood.username}</td>
		<td>{props.blood.bloodGroup}</td>
		<td>{props.blood.date.substring(0, 10)}</td>
		<td>
			<Link to={"/edit/" + props.blood._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBlood(props.blood._id) }}>delete</a>
		</td>
	</tr>
)

export default class BloodsList extends Component {
	constructor(props) {
		super(props);

		this.deleteBlood = this.deleteBlood.bind(this)

		this.state = { bloods: [] };
	}

	componentDidMount() {
		axios.get('http://localhost:5000/bloods/')
			.then(response => {
				this.setState({ bloods: response.data })
			})
			.catch((error) => {
				console.log(error);
			})
	}

	deleteBlood(id) {
		axios.delete('http://localhost:5000/bloods/' + id)
			.then(response => console.log(response.data));

		this.setState({
			bloods: this.state.bloods.filter(el => el._id !== id)
		})
	}

	bloodList() {
		return this.state.bloods.map(currentblood => {
			return <Blood blood={currentblood} deleteBlood={this.deleteBlood} key={currentblood._id} />;
		})
	}

	render() {
		return (
			<div>
				<h3>Logged Bloods</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Blood Group</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.bloodList()}
					</tbody>
				</table>
			</div>
		)
	}
}
