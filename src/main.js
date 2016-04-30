import React from 'react-native';

const {
	AppRegistry,
	Component,
	Navigator,
} = React;

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

export default class PluralTodo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = store.getState();

		store.subscribe(() => {
			this.setState(store.getState());
		});
	}
	
	onAddStarted() {
		this.nav.push({
			name: 'taskform',
		});
	}

	onToggle() {
		store.dispatch({
			type: 'TOGGLE_STATE',
		});
	}

	renderScene(route, nav) {
		switch(route.name) {
			case 'taskform': 
				return (
					<TaskForm 
						onCancel={this.onCancel.bind(this)}
						onAdd={this.onAdd.bind(this)}
					/>
				);
			default:
				return (
					<TaskList
						filter={this.state.filter}
						onAddStarted={this.onAddStarted.bind(this)}
						todos={this.state.todos}
						onToggle={this.onToggle.bind(this)}
						onDone={this.onDone.bind(this)}
					/>
				);
		}
	}
	
	configureScene() {
		return Navigator.SceneConfigs.FloatFromBottom;
	}

	onCancel() {
		this.nav.pop();
	}

	onAdd(task) {
		store.dispatch({
			type: 'ADD_TODO',
			task,
		});
		this.nav.pop();
	}

	onDone(todo) {
		store.dispatch({
			type: 'DONE_TODO',
			todo,
		});
	}

	render() {
		return (
			<Navigator
				configureScene={this.configureScene}
				initialRoute={{name: 'tasklist', index: 0}}
				ref={((nav) => {
					this.nav = nav;
				})}
				renderScene={this.renderScene.bind(this)}
			/>
		)
	}
}