import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function datePastFormatter(date: Date) {
	return formatDistanceToNow(date, {
		locale: ptBR,
		addSuffix: true,
	})
}

export function priceFormatter(price: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(price)
}

export function numberFormatter(value: number) {
	return value ? value.toLocaleString('pt-BR') : ''
}
