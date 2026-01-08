import { Card, Image, Skeleton, SkeletonText } from "@chakra-ui/react"
import { DynamicButton } from "st-peter-ui"

interface ProductCardProps {
    imgSrc?: string,
    title: string,
    description: string,
    onClick? : () => void
}

export const ProductCard = (props : ProductCardProps) => {
  return (
    <Card.Root 
    className="group"
    mx={{base: 0, mdDown: 3}} 
    overflow="hidden" 
    cursor={"pointer"} 
    transition="all 0.3s"
    _hover={{ 
        transform: "scale(1.03)", 
        shadow: "xl",
        bg: "var(--chakra-colors-primary)"
    }}>
        <Image
            src={props.imgSrc ? props.imgSrc : "https://blocks.astratic.com/img/general-img-landscape.png"}
            objectFit="cover"
            scale={1.2}
            transition="transform 0.3s"
            _groupHover={{
                transform: "scale(0.9)",
            }}
        />
        <Card.Body gap="2" mt={3}>
            <Card.Title _groupHover={{color: "#fff"}}>{props.title}</Card.Title>
            <Card.Description _groupHover={{color: "#fff"}}>{props.description}</Card.Description>
        </Card.Body>
        <Card.Footer gap="2">
            <DynamicButton label="Reserve now" onClick={props.onClick}/>
        </Card.Footer> 
    </Card.Root>
  )
}

export const ProductCardSkeleton = ({loading} : {loading : boolean}) => {
  return (
    <Card.Root className="group" mx={{ base: 0, mdDown: 3 }} overflow="hidden" cursor={"pointer"} transition="all 0.3s" display={loading ? "block" : "none"}>
      <Skeleton height="300px" width={"full"} loading={loading}/>
      <Card.Body gap="2" mt={3}>
        <Skeleton height={6} width={"full"} mb={2} loading={loading}/>
        <SkeletonText noOfLines={2} loading={loading} />
      </Card.Body>
      <Card.Footer gap="2">
        <Skeleton height={10} width={"120px"} mb={2} loading={loading}/>
      </Card.Footer>
    </Card.Root>
  )
}
