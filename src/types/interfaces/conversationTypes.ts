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

export interface IModerationState {
	has_been_moderated: boolean
	has_been_blocked: boolean
	has_been_accepted: boolean
}

export interface IConversationShareData {
	already_exists: boolean
	can_disable_discoverability: boolean
	current_node_id: string
	highlighted_message_id: string | null
	is_anonymous: boolean
	is_discoverable: boolean
	is_public: boolean
	is_visible: boolean
	moderation_state: IModerationState
	share_id: string
	share_url: string
	title: string
}
