export interface IConversation {}

export interface IConversationFetchResponse {
	items: IConversation[]
	limit: number
	offset: number
	total: number
}
