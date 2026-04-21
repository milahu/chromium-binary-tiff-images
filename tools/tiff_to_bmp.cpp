#include <cstddef>
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <vector>

#include "ccitt_g4_tiff/tiff.hpp"
#include "ccitt_g4_tiff/bmp_encoder.hpp"
// #include "bmp_encoder.cpp"


extern "C" {

// input: TIFF bytes
// output: malloc'd buffer (you free from JS)
uint8_t* tiff_to_bmp(
    const uint8_t* input,
    size_t input_size,
    size_t* output_size,
    int mode // 0 = 8-bit, 1 = 1-bit
);

void tiff_free(uint8_t* ptr);

}



uint8_t* tiff_to_bmp(
    const uint8_t* input,
    size_t input_size,
    size_t* output_size,
    int mode)
{
    try {
        auto img = ccitt_g4_tiff::TiffParser::parse(input, input_size);

        std::vector<uint8_t> bmp;

        if (mode == 1) {
            bmp = encode_bmp_1bit_fast(
                img.pixels,
                img.width,
                img.height
            );
        } else {
            auto expanded = expand_1bit_to_8bit(
                img.pixels,
                img.width,
                img.height
            );

            bmp = encode_bmp_grayscale(
                expanded,
                img.width,
                img.height
            );
        }

        *output_size = bmp.size();

        uint8_t* out = (uint8_t*)malloc(bmp.size());
        memcpy(out, bmp.data(), bmp.size());

        return out;
    }
    catch (...) {
        *output_size = 0;
        return nullptr;
    }
}

void tiff_free(uint8_t* ptr) {
    free(ptr);
}
