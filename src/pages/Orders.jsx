import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import Screensaver from '../components/Screensaver/Screensaver'
import { ContextAll } from '../context'

export default function Orders() {
	const [allOrders, setAllOrders] = useState([])

	const { isLoading, setIsLoading } = useContext(ContextAll)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://sneakers-server-8zd9.onrender.com/orders'
				)
				setAllOrders(data)
			} catch (error) {
				console.error('Error fetching orders:', error)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [])

	return (
		<div className='favorites'>
			{isLoading ? (
				<>
					<h1>
						<Link to='/'>
							<svg
								width='35'
								height='35'
								viewBox='0 0 35 35'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='0.5'
									y='0.5'
									width='34'
									height='34'
									rx='7.5'
									fill='white'
									stroke='#F2F2F2'
								/>
								<path
									d='M19 22L14 17L19 12'
									stroke='#C8C8C8'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Link>
						Мои заказы
					</h1>
					<div className='favoriteItems'>
						{(isLoading ? [...Array(8)] : allOrders).map((el, index) => (
							<Card key={isLoading ? index : el.id} {...el} isOrders={false} />
						))}
					</div>
				</>
			) : (
				allOrders.length < 1 && (
					<Screensaver
						image='img/icon/smile((.jpg'
						text='У вас нет заказов'
						description='Вы нищеброд?  Оформите хотя бы один заказ.'
					/>
				)
			)}
		</div>
	)
}
