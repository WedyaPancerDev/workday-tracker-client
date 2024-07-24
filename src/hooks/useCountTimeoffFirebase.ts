import { useEffect, useRef, useState } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData
} from 'firebase/firestore'
import { db } from '@/configs/firebase'
import type { IEmployeeTimeoffResponse } from '@/services/timeoff'

interface ReturnValues {
  pendingCount: number
  pendingName: IEmployeeTimeoffResponse[]
}

const usePendingTimeOffCount = (): ReturnValues => {
  const [pendingCount, setPendingCount] = useState<number>(0)
  const [pendingName, setPendingName] = useState<IEmployeeTimeoffResponse[]>([])

  const isMounted = useRef(true)

  const handleSnapshot = (querySnapshot: QuerySnapshot<DocumentData>): void => {
    const count = querySnapshot.size
    const names = querySnapshot.docs.map((doc) =>
      doc.data()
    ) as IEmployeeTimeoffResponse[]

    if (isMounted.current) {
      setPendingCount(count)
      setPendingName((prev) => [...prev, ...names])
    }
  }

  useEffect(() => {
    isMounted.current = true
    const q = query(collection(db, 'timeoff'), where('status', '==', 'pending'))

    const unsubscribe = onSnapshot(q, handleSnapshot)

    return () => {
      isMounted.current = false
      unsubscribe()
    }
  }, [])

  return {
    pendingCount,
    pendingName
  }
}

export default usePendingTimeOffCount
