import download from "image-downloader"
import mime from "mime-types"

export const downloadImage = async (link, destination) => {
    const mimeType = mime.lookup(link)
    const contentType = mime.contentType(mimeType)
    const extension = mime.extension(contentType)

    const filename = `${Date.now()}.${extension}`
    const fullPath = `${destination}${filename}`

    try {
        const options = {
            url: link,
            dest: fullPath,
        }

        await download.image(options)

        return filename
        // console.log("Saved to", filename)
    } catch (err) {
        console.error(err)
        throw err
    }
}