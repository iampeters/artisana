import React from 'react'
import SkeletonContent from 'react-native-skeleton-content';


export default function Placeholder() {
  return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={true}
      animationDirection="diagonalDownRight"
      animationType="pulse"
      // layout={[
      //   { key: 'someId', width: 220, height: 20, marginBottom: 6 },
      //   { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
      // ]}
    />
  )
}
