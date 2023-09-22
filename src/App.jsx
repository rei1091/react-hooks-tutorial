import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import ReiContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state, action) => {
	switch(action.type){
		case 'increment':
			return state+1;
			case 'decrement':
				return state-1;
				default:
					return state;
	}
}

function App() {
	const [count, setCount] = useState(0);
	const reiInfo = useContext(ReiContext);
	const ref = useRef();
	const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count+1);
	};
  const  handleM =() => {
		setCount(count-1);
	}

	useEffect(() => {
    console.log('Hello Hooks');
		//setCount(count+1);
	}, [count]);

	const handleRef = () => {
    console.log(ref);
		console.log(ref.current.value);
	};

	//useMemo値をメモリに保存しいつでも取り出せる
  const [count01, setCount01] = useState(0);
	const [count02, setCount02] = useState(0);

	// const square = () => {
	// 	let i = 0;
	// 	while(i < 2000000000) {
	// 		i++;
	// 	}
	//console.log('クリックされました')
	// 	return count02 * count02;
	// };

	const square = useMemo(() => {
	 	let i = 0;
	 	while(i <  2000000000) {
	 		i++;
	 	}
		console.log('クリックされました')
	 	return count02 * count02;
	 }, [count02]);

	 //useCallback 関数のメモ化
	 const [counter, setCounter] = useState(0);

	//  const showCount = () => {
	// 	alert('これは重い処理です');
	//  }

	const showCount = useCallback(() => {
		alert('これは重い処理です');
	 }, [counter]);

	 //カスタムフック
	 const [age, setAge] = useLocalStorage('age', 23);
	 
  return (
    <div className='App'>
    <h1>useState, useEffect</h1>
		<button onClick={handleClick}>+</button>
		<button onClick={handleM}>-</button>
		<p>{count}</p>

		<hr />
		<h1>useContext</h1>
		<p>{reiInfo.name}</p>
		<p>{reiInfo.age}</p>
		
		<hr />
		<h1>useRef</h1>
		<input type='text' ref={ref}/>
		<button onClick={handleRef}>useRef</button>

		<hr />
		<h1>useReducer</h1>
		<p>Count: {state}</p>
		<button onClick={()=>dispatch({type: 'increment'})}>+</button>
		<button onClick={()=>dispatch({type: 'decrement'})}>-</button>

		<hr />
		<h1>useMemo</h1>
		<div>Count1: {count01}</div>
		<div>Count2: {count02}</div>
		<div>結果: {square}</div>
		<button onClick={()=>setCount01(count01+1)}>+</button>
		<button onClick={()=>setCount02(count02+1)}>+</button>

		<hr />
		<h1>useCallback</h1>
		<SomeChild showCount={showCount} />

		<hr />
		<h1>カスタムフック</h1>
		<p>{age}</p>
		<button onClick={()=>setAge(30)}>年齢をセット</button>
		</div>
  )
}

export default App
