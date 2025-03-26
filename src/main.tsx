import React from 'react'
import { createRoot } from 'react-dom/client'

import './styles/index.css'
import App from './App'
import Frame from 'react-frame-component'

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Frame
			scrolling='no'
			head={[
				<link
					key='0'
					type='text/css'
					rel='stylesheet'
					href={chrome.runtime.getURL('/react/index.css')}
				/>,
			]}
		>
			<App />
		</Frame>
	</React.StrictMode>
)
