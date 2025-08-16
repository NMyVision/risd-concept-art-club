export type Id = string
export type Uri = string
export type Point = {
	latitude: number
	longitude: number
}

export type Book = {
	id: Id
	title: string
	field?: 'TV Show' | 'Game' | 'Movie' | 'Studio' | 'Artist' | 'General'
	author?: string
	studio?: string
	cover?: string
	pubYear?: number
	bookLink?: Uri
	publisher?: string
	created?: string
	updated?: string
}

export type Link_Category = {
	id: Id
	label?: string
	cover?: string
	created?: string
	updated?: string
}

export type Link = {
	id: Id
	label?: string
	url?: Uri
	cover?: string
	category?: string
	created?: string
	updated?: string
}

export type Publisher = {
	id: Id
	name?: string
	created?: string
	updated?: string
}

export type Resource = {
	id: Id
	title?: string
	subtitle?: string
	cover?: string
	layout?: 'books' | 'links' | 'publishers' | 'studios'
	attribution?: string
	classes?: string
	slug?: string
	created?: string
	updated?: string
  category?: string
}

export type Studio = {
	id: Id
	name?: string
	field?: '2D Animation' | 'CG Animation' | 'Gaming' | 'Video Production' | 'Entertainment Company' | 'Media Production' | 'Advertising' | 'Design' | 'Post Production' | 'Stop Motion' | 'Book' | 'VFX Company'
	location?: Point
	internships?: boolean
	url?: Uri
	created?: string
	updated?: string
}

export type User = {
	id: Id
	password: string
	tokenKey: string
	email: string
	emailVisibility?: boolean
	verified?: boolean
	firstName?: string
	lastName?: string
	avatar?: string
	created?: string
	updated?: string
}

