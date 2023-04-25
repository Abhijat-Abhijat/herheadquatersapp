ANDROID_PATH=../android
GRADLE_PATH="$ANDROID_PATH/app/build.gradle"

function sedi {
  if [ "$(uname)" == "Linux" ]; then
    sed -i "$@"
  else
    sed -i "" "$@"
  fi
}

currentVersionName=$(grep "versionName" $GRADLE_PATH | awk '{print $2}' | sed -e 's/^"//'  -e 's/"$//')
currentVersionCode=$(grep -o "versionCode\s\+\d\+" $GRADLE_PATH | awk '{ print $2 }')

printf "\n\nANDROID RELEASE\n\n\n"

echo current version name: "$currentVersionName"
echo current version code: "$currentVersionCode"


printf "\nIncrementing version code ...\n"

newVersionCode=$((currentVersionCode+1))
sedi 's/versionCode [0-9a-zA-Z -_]*/versionCode '$newVersionCode'/' $GRADLE_PATH

printf "New version code: %s\n" "$newVersionCode"

echo -e "Update current version name - \"$currentVersionName\"? (yes/no): \c"
read -r shouldVersionNameUpdate

if [ "$shouldVersionNameUpdate" == "yes" ]; then
    printf "\n"
    echo -e "Type new version name: \c"
    read -r newVersionName
    # todo: add newVersionName validation
    sedi 's/versionName [0-9a-zA-Z -_]*/versionName "'"$newVersionName"'"/' $GRADLE_PATH
fi

printf "\n"

cd "$ANDROID_PATH" || exit

fastlane build
fastlane upload_internal_build

# todo: add rollback if exit with error
