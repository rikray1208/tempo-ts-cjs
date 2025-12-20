import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        chains: 'src/chains.ts',
        'server/index': 'src/server/index.ts',
        'viem/index': 'src/viem/index.ts',
        'wagmi/index': 'src/wagmi/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    outDir: 'dist',
    skipNodeModulesBundle: true,
    outExtension({ format }) {
        return {
            js: format === 'cjs' ? '.cjs' : '.js',
        }
    },
    esbuildOptions(options) {
        options.conditions = ['module']
    },
    onSuccess: async () => {
        const fs = await import('fs')
        const path = await import('path')

        const distPath = path.resolve(process.cwd(), 'dist')
        const typesPath = path.resolve(distPath, 'types')

        if (!fs.existsSync(typesPath)) {
            fs.mkdirSync(typesPath, { recursive: true })
        }

        const moveTypes = (dir: string, baseDir: string = '') => {
            const items = fs.readdirSync(dir)

            items.forEach(item => {
                const fullPath = path.join(dir, item)
                const stat = fs.statSync(fullPath)

                if (stat.isDirectory()) {
                    moveTypes(fullPath, path.join(baseDir, item))
                } else if (item.endsWith('.d.ts') || item.endsWith('.d.ts.map')) {
                    const targetDir = path.join(typesPath, baseDir)
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir, { recursive: true })
                    }

                    const targetPath = path.join(targetDir, item)
                    fs.renameSync(fullPath, targetPath)
                }
            })
        }

        const esmPath = path.join(distPath, 'esm')
        if (fs.existsSync(esmPath)) {
            moveTypes(esmPath)
        }
    }
})