// app/settings.tsx
import { View, Text, StyleSheet } from 'react-native'

export default function Settings() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>⚙️ Settings Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
})
