module.exports = {
    getTransformModulePath(): any {
        return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts(): Array<string> {
        return ['ts', 'tsx'];
    }
};
