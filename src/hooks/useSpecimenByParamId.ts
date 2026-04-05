import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { findSpecimenById } from '@/services/specimens/catalog'

export function useSpecimenByParamId() {
  const { id } = useParams<{ id: string }>()
  return useMemo(() => findSpecimenById(id), [id])
}
