// components/Notification.js
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';

const Notification = ({ message, type }: any) => {
	const [noti, setNoti] = useState(null as any);
	// Determine the icon and colors based on the notification type
	const getNotificationStyle = () => {
		switch (type) {
			case 'success':
				return {
					icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
					bgColor: 'bg-green-50',
					textColor: 'text-green-700',
				};
			case 'error':
				return {
					icon: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
					bgColor: 'bg-red-50',
					textColor: 'text-red-700',
				};
			case 'info':
				return {
					icon: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-700',
				};
			default:
				return {
					icon: <InformationCircleIcon className="h-6 w-6 text-gray-500" />,
					bgColor: 'bg-gray-50',
					textColor: 'text-gray-700',
				};
		}
	};

	useEffect(() => {
		if (message) {
			setNoti({
				type: type,
				message: message,
			});
		}
	}, [message]);


	// Automatically hide the notification after 3 seconds
	setTimeout(() => {
		setNoti(null);
	}, 3000);

	const onClose = () => {
		setNoti(null);
	}

	const { icon, bgColor, textColor } = getNotificationStyle();

	return (
		<>
			{noti && (
				<div className={`fixed top-4 right-4 max-w-sm w-full ${bgColor} border border-gray-200 rounded-lg shadow-lg p-4 flex items-start space-x-4 z-50`}>
					{icon}
					<div className="flex-1">
						<p className={`font-semibold ${textColor}`}>{message?.title}</p>
						<p className="text-sm text-gray-500">{message?.body}</p>
					</div>
					<button onClick={onClose}>
						<XMarkIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
					</button>
				</div>
			)}
		</>
	);
};

export default Notification;
