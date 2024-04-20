export const getCustomStyle = (error: any): any => {
  const customStyle = {
    menu: (provided: object) => ({
      ...provided,
      zIndex: 24,
      fontSize: 14
    }),
    option: (provided: object) => ({
      ...provided,
      cursor: 'pointer',
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 14,
      fontWeight: 600,
    }),
    control: (provided: object) => ({
      ...provided,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 14,
      border: error ? '1px solid #FF5569' : '1px solid #E0E5EF',
      '&:hover': {
        border: error ? '1px solid #FF5569' : '1px solid #E0E5EF'
      },
      cursor: 'pointer',
      borderRadius: 8,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      fontWeight: 600
    }),
    singleValue: (provided: object) => ({
      ...provided,
      // Customize the text color for the selected value
      color: '#334155' // Change to your desired text color
    }),
    placeholder: (provided: object) => ({
      ...provided,
      // Customize the placeholder text color
      color: '#999' // Change to your desired placeholder text color
    })
  }
  return customStyle
}
