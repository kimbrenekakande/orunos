import { View, Text, ImageBackground, TouchableOpacity } from "react-native"
import images from "@/constants/images"

type tempProps = {
  title: string
  price: number
}

export const Template = ({ title }: tempProps) => {
  return (
    <TouchableOpacity className="w-64">
      <View className="h-72 rounded-xl overflow-hidden mb-2">
        <ImageBackground
          source={images.docPreview}
          resizeMode="cover"
          className="h-full w-full"
        />
      </View>
      <Text className="text-white text-sm px-1">{title}</Text>
    </TouchableOpacity>
  );
}
