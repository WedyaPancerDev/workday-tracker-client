import { useCallback, useEffect, useRef, useState } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData
} from 'firebase/firestore'
import { db } from '@/configs/firebase' // Pastikan Anda telah mengkonfigurasi Firestore

interface ReturnValues {
  pendingCount: number
}

const usePendingTimeOffCount = (): ReturnValues => {
  const [pendingCount, setPendingCount] = useState(0)
  const isMounted = useRef(true)

  const handleSnapshot = useCallback(
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const count = querySnapshot.size
      if (isMounted.current) {
        setPendingCount(count)
      }
    },
    []
  )

  useEffect(() => {
    isMounted.current = true
    const q = query(collection(db, 'timeoff'), where('status', '==', 'pending'))

    const unsubscribe = onSnapshot(q, handleSnapshot)

    return () => {
      isMounted.current = false
      unsubscribe()
    }
  }, [handleSnapshot])

  return {
    pendingCount
  }
}

export default usePendingTimeOffCount
