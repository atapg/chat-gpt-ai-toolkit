export interface IConversation {
	id: string
	async_status: null | string
	blocked_urls: string[]
	conversation_origin: null | string
	conversation_template_id: null | string
	create_time: string
	current_node: null | string
	gizmo_id: null | string
	is_archived: boolean
	is_starred: null | boolean
	mapping: null | Record<string, unknown>
	safe_urls: string[]
	snippet: null | string
	title: string
	update_time: string
	workspace_id: null | string
}

export interface IConversationFetchResponse {
	items: IConversation[]
	limit: number
	offset: number
	total: number
}

export enum AddConversationsToStateEnum {
	APPEND = 'APPEND',
	PREPEND = 'PREPEND',
}
