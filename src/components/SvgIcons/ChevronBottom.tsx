const ChevronBottom = (props: any) => {
	return (
		// <svg height='14' width='14' viewBox='0 0 180 180' {...props}>
		// 	{props.style ? <style style={{ ...props.style }}></style> : null}
		// 	<path
		// 		d='M92.672,144.373c-2.752,0-5.493-1.044-7.593-3.138L3.145,59.301c-4.194-4.199-4.194-10.992,0-15.18
		//            c4.194-4.199,10.987-4.199,15.18,0l74.347,74.341l74.347-74.341c4.194-4.199,10.987-4.199,15.18,0
		//            c4.194,4.194,4.194,10.981,0,15.18l-81.939,81.934C98.166,143.329,95.419,144.373,92.672,144.373z'
		// 	/>
		// </svg>
		<span {...props}>▾</span>
	)
}

export default ChevronBottom
