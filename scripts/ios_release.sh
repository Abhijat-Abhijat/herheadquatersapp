IOS_PATH=../ios

cd "$IOS_PATH" || exit

printf "\n\n"

echo IOS RELEASE

printf "\n\n\nDetecting current build number ...\n\n"

agvtool what-version

printf "\n\nIncrementing build number ...\n\n"

agvtool next-version -all

printf "\n\nDetecting current version name ...\n\n"

agvtool what-marketing-version

printf "\n"

echo -e "Update current version name? (yes/no): \c"
read -r shouldVersionNameUpdate

if [ "$shouldVersionNameUpdate" == "yes" ]; then
    printf "\n"
    echo -e "Type new version name: \c"
    read -r newVersionName
    # todo: add newVersionName validation
    xcrun agvtool new-marketing-version "$newVersionName"
fi

printf "\n"

fastlane build
fastlane upload_build_to_testflight
