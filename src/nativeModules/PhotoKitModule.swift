/*           PhotoKit module implemetation           */

import Foundation
import Photos
import React

@objc(PhotoKitModule)
class PhotoKitModule: NSObject, RCTBridgeModule {

    // export methods in order to call native Swift function from JS code
    RCT_EXPORT_MODULE()


    // METHODS
    static func moduleName() -> String! {
        return "PhotoKitModule"
    }

    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    /*           Retrieving Photos             */
    // The resolve and reject blocks are used to pass data back
    // to React Native JavaScript code. 
    // The resolve block is called with the array of photo metadata, 
    // while the reject block is used for error handling.

    // the publicly exposed method that React Native calls; handles the permission request
    @objc(fetchPhotos:)
    func fetchPhotos(_ resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {

        // Check for photo library access permissions
        PHPhotoLibrary.requestAuthorization { [weak self] status in
            guard let self = self else { return }

            switch status {
            case .authorized:
                self.retrievePhotos(resolve, rejecter: reject)
            case .denied:
                reject("NO_ACCESS", "User has denied access to the photo library.", nil)
            case .restricted:
                reject("RESTRICTED", "Access to the photo library is restricted.", nil)
            case .notDetermined:
                reject("NOT_DETERMINED", "Photo library access has not been determined.", nil)
            @unknown default:
                reject("ERROR", "Unknown error occurred while requesting authorization", nil)
            }
        }

    }

    // private helper method; responsible for the actual fetching of photos 
    // and their metadata (once permission is granted)
    private func retrievePhotos(_ resolve: @escaping RCTPromiseResolveBlock,
                                rejecter reject: @escaping RCTPromiseRejectBlock) {

        var photosArray: [[String: Any]] = []
        let fetchOptions = PHFetchOptions()

        // do-catch block: if an error is thrown during enumeration, it is caught and passed 
        // to the reject block, which formats the error into a message suitable for passing 
        // back to the React Native side.
        do {
            let allPhotos = PHAsset.fetchAssets(with: .image, options: fetchOptions)
            allPhotos.enumerateObjects { (asset, _, stop) in
                guard let location = asset.location else { return }  // skip photo if it doesn't have location data

                let photoInfo: [String: Any] = [
                    "latitude": location.coordinate.latitude,
                    "longitude": location.coordinate.longitude,
                    "creationDate": DateFormatter.localizedString(from: asset.creationDate ?? Date(), dateStyle: .medium, timeStyle: .medium)
                    // Add more metadata fields here as needed
                ]
                photosArray.append(photoInfo)
            }
            resolve(photosArray)
        } catch let error as NSError {
            reject("ENUM_ERROR", "An error occurred while enumerating the photo assets: \(error.localizedDescription)", error)
        }
    }


}






