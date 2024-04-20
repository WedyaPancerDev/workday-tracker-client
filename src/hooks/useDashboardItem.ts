import { useState, useEffect } from 'react'

import { getMateriPelatihan } from '@/services/materi-pelatihan'
import { getKeterampilan } from '@/services/keterampilan'
import { getTipePekerjaan } from '@/services/pekerjaan'
import { getPendidikan } from '@/services/pendidikan'
import { getSubSector } from '@/services/sub-sector'
import { getSector } from '@/services/sector'

import useToast from './useToast'
import { getEvents } from '@/services/dinas/event'
import { getInformations } from '@/services/dinas/information'

interface IDashboardItem {
  materiPelatihan: {
    count: number | null
    isLoading: boolean
  }
  keterampilan: {
    count: number | null
    isLoading: boolean
  }
  tipePekerjaan: {
    count: number | null
    isLoading: boolean
  }
  pendidikan: {
    count: number | null
    isLoading: boolean
  }
  subSector: {
    count: number | null
    isLoading: boolean
  }
  sector: {
    count: number | null
    isLoading: boolean
  }

  event: {
    count: number | null
    isLoading: boolean
  }
  informasi: {
    count: number | null
    isLoading: boolean
  }
}

const useDashboardItem = (): IDashboardItem => {
  const { showToast } = useToast()

  const [countMateriPelatihan, setCountMateriPelatihan] = useState<
    number | null
  >(0)
  const [countKeterampilan, setCountKeterampilan] = useState<number | null>(0)
  const [countTipePekerjaan, setCountTipePekerjaan] = useState<number | null>(0)
  const [countPendidikan, setCountPendidikan] = useState<number | null>(0)
  const [countSubSector, setCountSubSector] = useState<number | null>(0)
  const [countSector, setCountSector] = useState<number | null>(0)

  const [countEvent, setCountEvent] = useState<number | null>(0)
  const [countInformasi, setCountInformasi] = useState<number | null>(0)

  const [isLoadingMateriPelatihan, setIsLoadingMateriPelatihan] =
    useState<boolean>(false)
  const [isLoadingKeterampilan, setIsLoadingKeterampilan] =
    useState<boolean>(false)
  const [isLoadingTipePekerjaan, setIsLoadingTipePekerjaan] =
    useState<boolean>(false)
  const [isLoadingPendidikan, setIsLoadingPendidikan] = useState<boolean>(false)
  const [isLoadingSubSector, setIsLoadingSubSector] = useState<boolean>(false)
  const [isLoadingSector, setIsLoadingSector] = useState<boolean>(false)

  const [isLoadingEvent, setIsLoadingEvent] = useState<boolean>(false)
  const [isLoadingInformasi, setIsLoadingInformasi] = useState<boolean>(false)

  const fetchMateriPelatihan = async (): Promise<void> => {
    try {
      setIsLoadingMateriPelatihan(true)
      const response = (await getMateriPelatihan()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)
        setCountMateriPelatihan(finalResult?.length || 0)
      }

      setIsLoadingMateriPelatihan(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data materi pelatihan'
      })
      setIsLoadingMateriPelatihan(false)
    }
  }

  const fetchKeterampilan = async (): Promise<void> => {
    try {
      setIsLoadingKeterampilan(true)
      const response = (await getKeterampilan()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountKeterampilan(finalResult?.length || 0)
      }

      setIsLoadingKeterampilan(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data keterampilan'
      })
    }
  }

  const fetchTipePekerjaan = async (): Promise<void> => {
    try {
      setIsLoadingTipePekerjaan(true)
      const response = (await getTipePekerjaan()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountTipePekerjaan(finalResult?.length || 0)
      }

      setIsLoadingTipePekerjaan(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data tipe pekerjaan'
      })
      setIsLoadingTipePekerjaan(false)
    }
  }

  const fetchPendidikan = async (): Promise<void> => {
    try {
      setIsLoadingPendidikan(true)
      const response = (await getPendidikan()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountPendidikan(finalResult?.length || 0)
      }

      setIsLoadingPendidikan(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data pendidikan'
      })

      setIsLoadingPendidikan(false)
    }
  }

  const fetchSubSector = async (): Promise<void> => {
    try {
      setIsLoadingSubSector(true)
      const response = (await getSubSector()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountSubSector(finalResult?.length || 0)
      }

      setIsLoadingSubSector(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data sub sector'
      })

      setIsLoadingSubSector(false)
    }
  }

  const fetchSector = async (): Promise<void> => {
    try {
      setIsLoadingSector(true)
      const response = (await getSector()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountSector(finalResult?.length || 0)
      }

      setIsLoadingSector(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data sector'
      })
    }
  }

  const fetchEvent = async (): Promise<void> => {
    try {
      setIsLoadingEvent(true)
      const response = (await getEvents()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter((item) => item?.isaktif === 1)

        setCountEvent(finalResult?.length || 0)
      }

      setIsLoadingEvent(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data event'
      })
    }
  }

  const fetchInformasi = async (): Promise<void> => {
    try {
      setIsLoadingInformasi(true)
      const response = (await getInformations()) || []

      if (response?.length > 0) {
        const finalResult = response?.filter(
          (item) =>
            item?.isaktif === 1 &&
            item?.deskripsi !== null &&
            item?.kategori !== null
        )

        setCountInformasi(finalResult?.length || 0)
      }

      setIsLoadingInformasi(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data informasi'
      })
    }
  }

  useEffect(() => {
    if (!countMateriPelatihan) fetchMateriPelatihan()
    if (!countKeterampilan) fetchKeterampilan()
    if (!countTipePekerjaan) fetchTipePekerjaan()
    if (!countPendidikan) fetchPendidikan()
    if (!countSubSector) fetchSubSector()
    if (!countSector) fetchSector()

    if (!countEvent) fetchEvent()
    if (!countInformasi) fetchInformasi()

    return () => {
      setCountMateriPelatihan(null)
      setCountKeterampilan(null)
      setCountTipePekerjaan(null)
      setCountPendidikan(null)
      setCountSubSector(null)
      setCountSector(null)

      setCountEvent(null)
      setCountInformasi(null)
    }
  }, [])

  return {
    materiPelatihan: {
      count: countMateriPelatihan,
      isLoading: isLoadingMateriPelatihan
    },
    keterampilan: {
      count: countKeterampilan,
      isLoading: isLoadingKeterampilan
    },
    tipePekerjaan: {
      count: countTipePekerjaan,
      isLoading: isLoadingTipePekerjaan
    },
    pendidikan: {
      count: countPendidikan,
      isLoading: isLoadingPendidikan
    },
    subSector: {
      count: countSubSector,
      isLoading: isLoadingSubSector
    },
    sector: {
      count: countSector,
      isLoading: isLoadingSector
    },
    event: {
      count: countEvent,
      isLoading: isLoadingEvent
    },
    informasi: {
      count: countInformasi,
      isLoading: isLoadingInformasi
    }
  }
}

export default useDashboardItem
