import { useRef, useState } from 'react'
import { IConversation } from '../types/interfaces/conversationTypes'
import SidebarItemContextMenu from './ContextMenu/SidebarItemContextMenu'

const Dev = () => {
	const conversation = {
		async_status: null,
		blocked_urls: [],
		conversation_origin: null,
		conversation_template_id: null,
		create_time: '2025-04-05T06:07:39.627990Z',
		current_node: null,
		gizmo_id: null,
		id: '67f0c8ab-60fc-800e-af2b-49c8933ca8c8',
		is_archived: false,
		is_do_not_remember: null,
		is_starred: null,
		mapping: null,
		safe_urls: [],
		snippet: null,
		title: 'JS vs TS',
		update_time: '2025-04-05T06:07:44.555284Z',
		workspace_id: null,
	}

	const [showDialog, setShowDialog] = useState(false)
	const [selectedConversation, setSelectedConversation] =
		useState<IConversation | null>(null)

	const openDialog = (conversation: IConversation) => {
		setSelectedConversation(conversation)
		setShowDialog(true)
	}

	// const closeDialog = () => {
	// 	setShowDialog(false)
	// 	setSelectedConversation(null)
	// }

	// const handleDelete = () => {
	// 	if (selectedConversation) {
	// 		// Implement delete logic here
	// 		console.log(`Deleting conversation: ${selectedConversation.id}`)
	// 		closeDialog()
	// 	}
	// }

	const ref = useRef(null)

	// const handleShare = () => {
	// 	if (selectedConversation) {
	// 		// Implement share logic here
	// 		console.log(`Sharing conversation: ${selectedConversation.id}`)
	// 		closeDialog()
	// 	}
	// }

	return (
		<div>
			<h1>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Asperiores sed cumque dolores ipsam enim alias qui similique,
				iste quisquam fugit quidem eligendi ex aliquid saepe assumenda
				sunt dolorum dignissimos minus excepturi. Aut sint voluptatibus
				dolores itaque, error illum soluta beatae! Est eum quas facilis
				laudantium. Molestiae esse, et molestias veniam corrupti id,
				quaerat quam alias consequuntur laboriosam voluptatem facere
				recusandae fuga aperiam, doloremque assumenda quia? Dolorum
				labore eaque voluptate quos. Molestiae ipsa iure asperiores non
				earum ducimus illo. Fuga alias nostrum molestiae culpa
				obcaecati. Adipisci maxime vitae molestiae veniam quisquam error
				placeat sunt, magnam delectus, modi incidunt quae deserunt
				dolorem.
			</h1>

			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
				dicta, beatae rem quidem eligendi quod praesentium iste,
				cupiditate distinctio magnam, quia laudantium dolor atque omnis
				est officia dignissimos nisi facere. Similique, odio quod magnam
				iure odit quibusdam laudantium perferendis labore tempore
				dolores! Alias numquam tempora, aliquam impedit sequi quod ipsam
				dolore dignissimos fuga similique minima eos temporibus deserunt
				nobis atque sit reprehenderit excepturi? Eligendi reiciendis
				harum dolores dolore velit quos voluptate, temporibus iste cum.
				Ex, quod maiores doloribus beatae eum sint totam recusandae
				tempore non alias quidem neque cumque, saepe cum perferendis
				quibusdam odio quis libero nostrum assumenda deleniti maxime,
				illo corporis rerum. Repudiandae reiciendis doloribus voluptatum
				exercitationem minima. A, voluptate temporibus deserunt
				architecto officiis dolorem hic corporis blanditiis perferendis
				nemo ducimus molestias minima nihil eveniet odit excepturi
				reprehenderit sed aliquid quia! Tempore voluptatem inventore,
				illo culpa quibusdam repellat blanditiis placeat ea dolore
				cumque perferendis atque, vero a officiis asperiores repellendus
				vitae aliquam consequatur, ex suscipit quis odit sapiente natus.
				Officia magni incidunt recusandae quidem ducimus minus iusto
				eaque omnis optio ea natus similique neque vitae cum, eos
				tempore. Modi tempora voluptatibus delectus iste enim asperiores
				eaque! Repellendus, est natus? Vero eaque quas et dolorum itaque
				fugiat ea accusantium quod.
			</p>

			<button
				onClick={(e) => {
					e.stopPropagation()
					openDialog(conversation)
				}}
				ref={ref}
			>
				click
			</button>

			{showDialog && selectedConversation && (
				<SidebarItemContextMenu elementToBeStickedTo={ref} />
			)}

			<h2>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam non
				commodi odio totam quod ab. Sit temporibus consequatur
				blanditiis alias a repellat nesciunt quia error exercitationem
				assumenda mollitia vel eveniet asperiores corporis sequi,
				quaerat hic esse totam, necessitatibus laborum ad? Nesciunt
				voluptatem distinctio dolorum voluptatibus, laborum nostrum
				excepturi doloribus nihil at non similique cupiditate dolorem
				porro debitis ex sint pariatur sunt libero illo accusamus iure
				minima perspiciatis quo sequi? Magnam aliquam qui molestias
				iusto velit ullam sunt ipsa eum. Beatae, accusantium voluptas
				reiciendis voluptates facilis sint explicabo delectus architecto
				impedit voluptatum odio provident tempore vero dolore atque
				labore quia. Similique iure inventore rerum voluptate laudantium
				laborum corrupti ipsa eos impedit fugiat? Inventore incidunt
				vero eveniet, quas doloremque, repellendus suscipit eum pariatur
				adipisci aliquam eligendi possimus quod accusantium delectus ad
				laboriosam unde odio quis! Et adipisci quae modi velit incidunt
				at numquam tempore voluptas, similique quasi eaque perferendis
				totam omnis nesciunt quia nihil dolorem pariatur. Totam nam
				doloremque illum at. Officia aliquam, beatae harum sint ab
				pariatur sunt laborum in. Perferendis minus atque facere facilis
				omnis dolor possimus amet sapiente fugit adipisci quas vitae
				corrupti, quasi, repellendus quae iusto nemo cupiditate quos,
				ducimus unde in illum sequi deleniti. Adipisci temporibus
				officiis corporis dolorum impedit commodi aliquam sequi facilis
				magni porro nobis praesentium at voluptatem tempore doloribus
				quisquam, explicabo soluta, vitae sint ullam laudantium repellat
				dicta alias. Sint nostrum, consectetur est, quas, alias earum
				officiis placeat veniam exercitationem officia minus rem eum
				veritatis dolore itaque dolor quisquam! Eius repellat dolorem
				ipsam fugit laborum voluptate illo ipsa nulla! Voluptatem illo
				reiciendis consectetur aperiam eos quos tenetur praesentium
				voluptatum voluptates suscipit, totam consequatur? Illum
				voluptatibus nobis odit est ipsum, cum facilis libero
				necessitatibus? Vero delectus quis illum ipsam quas cum, dolores
				harum quasi saepe debitis assumenda ad magnam ut quidem dicta
				minima eum cupiditate accusamus fugiat. Voluptatum, cumque?
				Alias perferendis natus dolorum beatae voluptatem possimus
				quisquam minus earum, officiis eos iure doloremque neque
				laudantium, fuga maiores exercitationem vitae. Eos explicabo
				commodi facilis voluptatibus magni vitae optio veniam, culpa,
				cumque tempora, iste est? Dicta unde beatae delectus
				consequatur, animi, cumque ad facere fugit alias quibusdam fuga
				officiis eius sed! Reprehenderit iste earum dolores unde ut
				doloribus fugit optio quia suscipit, a neque maxime cum odit,
				repellendus illum, accusantium amet. Ex, aspernatur? Temporibus
				at repudiandae, et quasi consequatur quos fuga, rerum doloribus
				ipsum voluptate adipisci eveniet. Dolorum ab ad explicabo
				praesentium quasi deserunt hic sapiente tempore ut reiciendis
				libero accusantium dolor expedita obcaecati aspernatur, aliquam
				asperiores qui, beatae est quaerat velit iusto enim. Odit
				voluptatum eaque at ab aperiam facilis corporis, reprehenderit
				enim. Placeat dolore eius quasi ea id. Unde, ea? Quisquam
				voluptatem eveniet quam amet neque dicta ex veritatis inventore
				incidunt libero? Fugiat est pariatur minima corrupti aspernatur
				qui vel ut suscipit eligendi earum corporis id necessitatibus
				beatae, odio atque laudantium aut cum tenetur! Voluptatibus
				ipsa, facere temporibus, in sit dolore id fugit magni reiciendis
				commodi officiis sunt quo. Ducimus reprehenderit aliquid,
				eligendi aut necessitatibus, unde itaque sequi optio consequatur
				dignissimos explicabo recusandae minus omnis?
			</h2>
		</div>
	)
}

export default Dev
