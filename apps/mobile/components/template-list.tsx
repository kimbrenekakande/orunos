import { View, Text, ImageBackground } from "react-native"
import images from "@/constants/images"

type tempProps = {
  title: string
  price : number
}

export const Template = ({ title, price }: tempProps) => (
  <View className="gap-2">
    <View className="rounded -ml-1 p-2 h-75 w-55">
      <ImageBackground
        source={images.docPreview}
        resizeMode="cover"
        className="h-full w-full rounded"
      />
    </View>
    <View className="ml-1">
      <Text className="text-white">{title}</Text>
    </View>
  </View>
)